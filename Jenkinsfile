pipeline {
   agent { dockerfile true }
   environment {
       registry = "192.168.1.81:5000/chitrankdixit/sargam-api"
       dockerImage = "chitrankdixit/sargam-api"
   }
   stages {
       stage('Checkout Source') {
        steps {
          git 'https://github.com/justmeandopensource/playjenkins.git'
        }
      }
       stage('Build') {
           steps{
            script {
              dockerImage = docker.build registry + ":$BUILD_NUMBER"
            }
          }
       }
       stage('Test') {
        steps {
          script {
            docker.withRegistry( "" ) {
              dockerImage.inside() {
               sh 'npm tests'
              }
            }
          }
        }
           
       }
       stage('Publish') {
           steps{
            script {
              docker.withRegistry( "" ) {
                dockerImage.push()
              }
            }
          }
       }
       stage ('Deploy') {
           steps {
            script {
              kubernetesDeploy(configs: "deployment.yaml", kubeconfigId: "myserverconfig")
            }
          }
       }
   }
}
