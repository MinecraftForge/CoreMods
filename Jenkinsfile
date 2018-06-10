pipeline {
  agent {
    docker {
        image 'gradle:latest'
        args '-v gradlecache:/home/gradle/.gradle'
    }
  }
  stages {
    stage('fetch') {
      steps {
        git(url: 'https://github.com/cpw/coremods.git', changelog: true)
      }
    }
    stage('buildandtest') {
      steps {
        sh './gradlew build test'
      }
    }
    stage('publish') {
      environment {
        FORGE_MAVEN = credentials('forge-maven-forge-user')
      }
      steps {
        sh './gradlew publish -PforgeMavenUser=${FORGE_MAVEN_USR} -PforgeMavenPassword=${FORGE_MAVEN_PSW}'
        sh 'curl --user ${FORGE_MAVEN} http://files.minecraftforge.net/maven/manage/promote/latest/net.minecraftforge.coremods/${BUILD_NUMBER}'
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'build/libs/**/*.jar', fingerprint: true
      junit 'build/test-results/**/*.xml'
      jacoco sourcePattern: '**/src/*/java'
    }
  }
}