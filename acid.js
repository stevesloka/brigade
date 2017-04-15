pr = pushRecord;

// This is a Go project, so we want to set it up for Go.
gopath = "/go"

// To set GOPATH correctly, we have to override the default
// path that Acid sets.
localPath = gopath + "/src/github.com/" + pr.repository.name

job1 = new Job("run-unit-tests");

// Since this is Go, we want a go runner.
job1.image = "acid-go:latest";

// Set a few environment variables.
job1.env = {
    "DEST_PATH": localPath,
    "GOPATH": gopath
};

job1.secrets = {
  "DB_USER": "mysecret.username",
  "DB_PASS": "mysecret.password",
};

// Run three tasks in order.
job1.tasks = [
  "go get github.com/Masterminds/glide",
  "glide install",
  "make test-fast"
];

job1.run(pr);