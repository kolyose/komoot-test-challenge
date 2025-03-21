provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "komoot_test" {
  bucket = "komoot-test-bucket"
}

resource "aws_s3_bucket_ownership_controls" "komoot_test" {
  bucket = aws_s3_bucket.komoot_test.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "komoot_test" {
  depends_on = [aws_s3_bucket_ownership_controls.komoot_test]
  bucket     = aws_s3_bucket.komoot_test.id
  acl        = "private"
}

resource "aws_s3_object" "komoot_assets" {
  for_each = fileset("./dist", "**/*")

  bucket = aws_s3_bucket.komoot_test.id
  key    = each.value
  source = "dist/${each.value}"
  acl    = "public-read"
  content_type = lookup({
    ".html" = "text/html",
    ".css" = "text/css",
    ".js"  = "application/javascript"
  }, regex(".*\\.(.*)$", each.value)[0], "application/octet-stream")
}

resource "aws_cloudfront_origin_access_control" "komoot_test" {
  name                              = "komoot-test-OAC"
  description                       = "The origin access control configuration for the Cloudfront distribution"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}
  
resource "aws_cloudfront_distribution" "komoot_test" {
  enabled = true
  
  origin {
    domain_name              = aws_s3_bucket.komoot_test.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.komoot_test.id
    origin_id                = "origin-bucket-${aws_s3_bucket.komoot_test.id}"
  }

  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "DELETE", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    min_ttl                = "0"
    default_ttl            = "300"
    max_ttl                = "1200"
    target_origin_id       = "origin-bucket-${aws_s3_bucket.komoot_test.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_code         = "200"
    response_page_path    = "/404.html"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

}

resource "aws_s3_bucket_policy" "komoot_test" {
    bucket = aws_s3_bucket.komoot_test.id
	  policy = jsonencode({
	    "Version" : "2012-10-17",
	    "Statement" : [
	      {
	        "Sid" : "AllowCloudFrontServicePrincipalReadOnly",
	        "Effect" : "Allow",
	        "Principal" : {
	          "Service" : "cloudfront.amazonaws.com"
	        },
	        "Action" : "s3:GetObject",
	        "Resource" : "${aws_s3_bucket.komoot_test.arn}/*",
	        "Condition" : {
	          "StringEquals" : {
	            "AWS:SourceArn" : "${aws_cloudfront_distribution.komoot_test.arn}"
	          }
	        }
	      }
	    ]
	  })
	}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.komoot_test.domain_name
}
