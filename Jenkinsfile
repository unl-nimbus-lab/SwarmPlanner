swarmplanner {
    def app

    stage('Build image') {
        checkout scm
        app = docker.build(" -f React/Dockerfile -t ghcr.io/unl-nimbus-lab/swarmplanner/swarmplannerreact:latest")
        app.push()
    }
}