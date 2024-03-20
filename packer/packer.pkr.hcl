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
  zone                = "us-east4-a"
  machine_type        = "e2-standard-4"
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
    source      = "csye.service"
    destination = "/tmp/csye.service"
  }

  provisioner "file" {
    source      = "config.yaml"
    destination = "/tmp/config.yaml"
  }

  provisioner "shell" {
    scripts = [
      "./install.sh",
    ]
    pause_before = "10s"
    timeout      = "10s"
  }

  provisioner "shell" {
    inline = [
      "sudo bash -c 'curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh'",
      "sudo bash add-google-cloud-ops-agent-repo.sh --also-install",
      "sudo cp -f /tmp/config.yaml /etc/google-cloud-ops-agent/config.yaml",
      "sudo systemctl restart google-cloud-ops-agent",
      "sudo systemctl status google-cloud-ops-agent",
    ]
    pause_before = "10s"
    execute_command = "echo 'packer' | {{.Vars}} sudo -S sh -c '{{.Path}}'"
  }

}
