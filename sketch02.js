let video;
let poseNet;
let handPose;
let poses = [];
let hands = [];
let painting;

let colors = [];
let selectedColor;

let prevPoints = {}; // 이전 위치 저장

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 모바일 후면 카메라
  video = createCapture({ video: { facingMode: "environment" } });
  video.size(width, height);
  video.hide();

  // PoseNet
  poseNet = ml5.poseNet(video, () => console.log("PoseNet ready"));
  poseNet.on('pose', results => poses = results);

  // HandPose
  handPose = ml5.handPose(video, () => console.log("HandPose ready"));
  handPose.on('hand', results => hands = results);

  painting = createGraphics(width, height);
  painting.clear();

  // 색 배열
  colors = [
    color(197, 82, 95), // index
    color(283, 69, 63), // middle
    color(344, 100, 93), // ring
    color(32, 68, 97)   // pinky
  ];
  selectedColor = colors[0];

  colorMode(HSB);
  painting.colorMode(HSB);
}

function draw() {
  image(video, 0, 0, width, height);

  // 팔 그리기 (PoseNet)
  if (poses.length > 0) {
    let pose = poses[0].pose;

    let parts = [
      ["rightShoulder","rightElbow"],
      ["rightElbow","rightWrist"],
      ["leftShoulder","leftElbow"],
      ["leftElbow","leftWrist"]
    ];

    painting.stroke(selectedColor);
    painting.strokeWeight(6);

    for (let [a,b] of parts) {
      if (pose[a] && pose[b]) {
        painting.line(pose[a].x, pose[a].y, pose[b].x, pose[b].y);
      }
    }
  }

  // 손가락 끝 그리기 (HandPose)
  if (hands.length > 0) {
    for (let hand of hands) {
      for (let keypoint of hand.landmarks) {
        let id = keypoint.toString(); // 각 점 고유 key
        let x = keypoint[0];
        let y = keypoint[1];

        if (prevPoints[id]) {
          painting.stroke(selectedColor);
          painting.strokeWeight(4);
          painting.line(prevPoints[id].x, prevPoints[id].y, x, y);
        }

        prevPoints[id] = {x:x, y:y};
      }
    }
  }

  image(painting, 0, 0);
}

// 터치하면 색 변경 (왼손 엄지와 손끝 비슷한 느낌)
function touchStarted() {
  let index = floor(random(colors.length));
  selectedColor = colors[index];
}
