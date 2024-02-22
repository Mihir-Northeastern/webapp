packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1"
    }
  }
}

variable "project_id" {
  type    = string
  default = "dev-gcp-414917"
}


source "googlecompute" "basic_example" {
  project_id          = var.project_id
  source_image_family = "centos-stream-8"
  ssh_username        = "packer"
  zone                = "us-east1-b"
  machine_type        = "e2-standard-16"
}

build {
  sources = [
    "source.googlecompute.basic_example"
  ]

  provisioner "file" {
    source      = "../webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "file" {
    source      = "../install.sh"
    destination = "/tmp/install.sh"
  }

  provisioner "file" {
    source      = "../postgres.sh"
    destination = "/tmp/postgres.sh"
  }

  provisioner "file" {
    source      = "../npm.sh"
    destination = "/tmp/npm.sh"
  }

  provisioner "shell" {
    inline = [
      "chmod +x /tmp/install.sh",
      "/tmp/install.sh",
      "chmod +x /tmp/postgres.sh",
      "/tmp/postgres.sh",
      "chmod +x /tmp/npm.sh",
      "/tmp/npm.sh"
    ]
  }

}
