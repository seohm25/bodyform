let video;
let bodyPose;
let poses = [];
let limbConnections;
let drawEvery = 30; // 몇 프레임마다 그릴지 설정

let painting;

function preload() {
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 540); // 아래에 폰트 표시 공간 확보
  textFont('embodiedform5-Regular.woff');   // 원하는 폰트로 변경 가능
  textSize(20);
  fill(0);

  // 팔·다리 연결 정의 (어깨/골반 제외)
  limbConnections = [
    [5, 7], [7, 9], // Left Arm
    [6, 8], [8, 10], // Right Arm
    [11, 13], [13, 15], // Left Leg
    [12, 14], [14, 16]  // Right Leg
  ];

  // painting 레이어
  painting = createGraphics(640, 480);
  painting.clear();

  // 카메라 생성
  video = createCapture(VIDEO, () => {
    bodyPose.detectStart(video, gotPoses);
  });
  video.size(640, 480);
  video.hide();

  // Reset 버튼
  let resetBtn = createButton("Reset");
  resetBtn.position(10, 10);
  resetBtn.mousePressed(() => painting.clear());

  // Capture 버튼
  let captureBtn = createButton("screenshot");
  captureBtn.position(80, 10);
  captureBtn.mousePressed(() => {
    save(painting, `bodypose_lines_${Date.now()}.png`);
    console.log("Painting captured!");
  });
}

function draw() {
  background(255);

  if (video) {
    // 영상 좌우 반전
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, 480);
    filter(GRAY);
    pop();

    drawSkeleton();
    drawToPainting();

    // painting 레이어 출력
    image(painting, 0, 0);

    // 카메라 아래 폰트 표시
    fill(0);
    noStroke();
    text("your own bodeiform..", 10, 500);
  }
}

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    // 선 그리기
    for (let j = 0; j < limbConnections.length; j++) {
      let a = limbConnections[j][0];
      let b = limbConnections[j][1];

      let pointA = pose.keypoints[a];
      let pointB = pose.keypoints[b];

      if (pointA.confidence > 0.05 && pointB.confidence > 0.05) {
        stroke(0);
        strokeWeight(2);
        strokeCap(SQUARE);

        let ax = width - pointA.x;
        let bx = width - pointB.x;

        line(ax, pointA.y, bx, pointB.y);
      }
    }

    // 점 그리기 (네모, 얼굴·어깨·골반 제외)
    for (let j = 0; j < pose.keypoints.length; j++) {
      if ([0, 1, 2, 3, 4, 5, 6, 11, 12].includes(j)) continue; // 제외
      let k = pose.keypoints[j];
      if (k.confidence > 0.05) {
        fill(0);
        noStroke();
        let kx = width - k.x; // 좌우 반전
        square(kx, k.y, 10);  // 네모 점
      }
    }
  }
}

function drawToPainting() {
  if (frameCount % drawEvery !== 0) return;

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    // 선 누적
    for (let j = 0; j < limbConnections.length; j++) {
      let a = limbConnections[j][0];
      let b = limbConnections[j][1];

      let pointA = pose.keypoints[a];
      let pointB = pose.keypoints[b];

      if (pointA.confidence > 0.05 && pointB.confidence > 0.05) {
        painting.stroke(0);
        painting.strokeWeight(5);
        painting.strokeCap(SQUARE);

        let ax = painting.width - pointA.x;
        let bx = painting.width - pointB.x;

        painting.line(ax, pointA.y, bx, pointB.y);
      }
    }

    // 점 누적 (네모, 얼굴·어깨·골반 제외)
    for (let j = 0; j < pose.keypoints.length; j++) {
      if ([0, 1, 2, 3, 4, 5, 6, 11, 12].includes(j)) continue;
      let k = pose.keypoints[j];
      if (k.confidence > 0.05) {
        painting.noStroke();
        painting.fill(0);
        let kx = painting.width - k.x; // 좌우 반전
        painting.square(kx, k.y, 10);  // 네모 점
      }
    }
  }
}

function gotPoses(results) {
  poses = results;
}



/////// new...////poseclassification - collecting data



// ml5.js: Pose Classification
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.2-pose-classification.html
// https://youtu.be/FYgYyq-xqAw

// All code: https://editor.p5js.org/codingtrain/sketches/JoZl-QRPK

// Separated into three sketches
// 1: Data Collection: https://editor.p5js.org/codingtrain/sketches/kTM0Gm-1q
// 2: Model Training: https://editor.p5js.org/codingtrain/sketches/-Ywq20rM9
// 3: Model Deployment: https://editor.p5js.org/codingtrain/sketches/c5sDNr8eM
// ml5.js: Pose Classification
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.2-pose-classification.html
// https://youtu.be/FYgYyq-xqAw

// All code: https://editor.p5js.org/codingtrain/sketches/JoZl-QRPK

// Separated into three sketches
// 1: Data Collection: https://editor.p5js.org/codingtrain/sketches/kTM0Gm-1q
// 2: Model Training: https://editor.p5js.org/codingtrain/sketches/-Ywq20rM9
// 3: Model Deployment: https://editor.p5js.org/codingtrain/sketches/c5sDNr8eM

// let video;
// let poseNet;
// let pose;
// let skeleton;

// let brain;

// let state = 'waiting';
// let targetLabel;

// function keyPressed() {
//  if (key == 's') {
//     brain.saveData();
//   } else {
//     targetLabel = key;
//     console.log(targetLabel);
//     setTimeout(function() {
//       console.log('collecting');
//       state = 'collecting';
//       setTimeout(function() {
//         console.log('not collecting');
//         state = 'waiting';
//       }, 10000);
//     }, 10000);
//   }
// }

// function setup() {
//   createCanvas(640, 480);
  
//   video = createCapture(VIDEO);
//   video.hide();
//   poseNet = ml5.poseNet(video, modelLoaded);
//   poseNet.on('pose', gotPoses);

//   let options = {
//     inputs: 34,
//     outputs: 4,
//     task: 'classification',
//     debug: true
//   }
//   brain = ml5.neuralNetwork(options);
//   brain.loadData('alphabet.json', dataReady);
// }

// function dataReady() {
//   brain.normalizeData();
//   brain.train({epochs: 50}, finished);
// }

// function finished() {
//   console.log('model trained');
//   brain.save();
// }

// function gotPoses(poses) {
//   // console.log(poses); 
//   if (poses.length > 0) {
//     pose = poses[0].pose;
//     skeleton = poses[0].skeleton;
//     if (state == 'collecting') {
//       let inputs = [];
//       for (let i = 0; i < pose.keypoints.length; i++) {
//         let x = pose.keypoints[i].position.x;
//         let y = pose.keypoints[i].position.y;
//         inputs.push(x);
//         inputs.push(y);
//       }
//       let target = [targetLabel];
//       brain.addData(inputs, target);
//     }
//   }
// }


// function modelLoaded() {
//   console.log('poseNet ready');
// }

// function draw() {
//   translate(video.width, 0);
//   scale(-1, 1);
//   image(video, 0, 0, video.width, video.height);

//   if (pose) {
//     for (let i = 0; i < skeleton.length; i++) {
//       let a = skeleton[i][0];
//       let b = skeleton[i][1];
//       strokeWeight(2);
//       stroke(0);

//       line(a.position.x, a.position.y, b.position.x, b.position.y);
//     }
//     for (let i = 0; i < pose.keypoints.length; i++) {
//       let x = pose.keypoints[i].position.x;
//       let y = pose.keypoints[i].position.y;
//       fill(0);
//       stroke(255);
//       ellipse(x, y, 16, 16);
//     }
//   }
// }