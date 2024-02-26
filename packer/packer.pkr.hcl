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
    source      = "webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "file" {
    source      = "install.sh"
    destination = "/tmp/install.sh"
  }

  provisioner "file" {
    source      = "postgres.sh"
    destination = "/tmp/postgres.sh"
  }

  provisioner "fil" {
    source      = "npm.sh"
    destination = "/tmp/npm.sh"
  }

  provisioner "file"{
    source = "csye.service"
    destination = "/tmp/csye.service"
  }

  provisioner "shell" {
    scripts = [
      "./install.sh",
      "./postgres.sh",
      "./npm.sh",
    ]
    pause_before = "10s"
    timeout = "10s"
  }

}
