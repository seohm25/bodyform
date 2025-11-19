// // Hand Pose Drawing with Color Selection

let video;
let handPose;
let hands = [];
let painting;
let colors = [];
let selectedColor;
let drawEvery = 1000; 

let prevFingers = {
  index: { x: null, y: null },
  middle: { x: null, y: null },
  ring: { x: null, y: null },
  pinky: { x: null, y: null },
  thumb: { x: null, y: null }
};

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function setup() {
  createCanvas(1920, 1080);
  colorMode(HSB);

  painting = createGraphics(640, 480);
  painting.colorMode(HSB);
  painting.clear();

  colors = [
    color(255, 255,), 
    color(283, 69, 63), 
    color(344, 100, 93),
    color(32, 68, 97)
  ];
  selectedColor = colors[0];

  //video camera 
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  handPose.detectStart(video, gotHands);
}

function gotHands(results) {
  hands = results;
}

function draw() {
  image(video, 0, 0);

  let rightHand = null;
  let leftHand = null;

  if (hands.length > 0) {
    for (let hand of hands) {
      // keypoints 구조에서 필요한 손가락 찾기
      let kp = hand.keypoints;

      let index = kp.find(k => k.name === "index_finger_tip");
      let middle = kp.find(k => k.name === "middle_finger_tip");
      let ring = kp.find(k => k.name === "ring_finger_tip");
      let pinky = kp.find(k => k.name === "pinky_finger_tip");
      let thumb = kp.find(k => k.name === "thumb_tip");

      if (hand.handedness === "Right") {
        rightHand = { index, middle, ring, pinky, thumb };
      } else if (hand.handedness === "Left") {
        leftHand = { index, middle, ring, pinky, thumb };
      }
    }


    // ⭐ 오른손: 그림 그리기
    if (rightHand) {
      let fingers = {
        index: rightHand.index,
        middle: rightHand.middle,
        ring: rightHand.ring,
        pinky: rightHand.pinky,
        thumb: rightHand.thumb
      };

      for (let name in fingers) {
        let f = fingers[name];
        let p = prevFingers[name];

        if (p.x !== null && frameCount % drawEvery === 0) {
  painting.stroke(selectedColor);
  painting.strokeWeight(0.05);
  painting.line(p.x, p.y, f.x, f.y);
}

        p.x = f.x;
        p.y = f.y;
      }
    }
  }
  
   if (leftHand) {
      let fingers = {
       index: leftHand.index,
        middle: leftHand.middle,
        ring: leftHand.ring,
        pinky: leftHand.pinky,
        thumb: leftHand.thumb
      };

      for (let name in fingers) {
        let f = fingers[name];
        let p = prevFingers[name];

        if (p.x !== null) {
          painting.stroke(selectedColor);
          painting.strokeWeight(0.05);
          painting.line(p.x, p.y, f.x, f.y);
        }

        p.x = f.x;
        p.y = f.y;
      }
   }
  image(painting, 0, 0);
}


// Hand Pose Drawing with Color Selection 


// // Hand Pose Drawing with Color Selection 
// // https://youtu.be/vfNHdVbE-l4
// // https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

// let video;
// let handPose;
// let hands = [];
// let painting;
// let px = 0;
// let py = 0;
// let h = 8;
// let colors = [];
// let selectedColor;

// function preload() {
//   // Initialize HandPose model with flipped video input
//   handPose = ml5.handPose({ flipped: true });
// }

// function mousePressed() {
//   // Log detected hand data to the console
//   console.log(hands);
// }

// function gotHands(results) {
//   hands = results;
// }

// function setup() {
//   createCanvas(640, 480);
//   colorMode(HSB);

//   // Create an off-screen graphics buffer for painting
//   painting = createGraphics(640, 480);
//   painting.colorMode(HSB);
//   painting.clear();

//   // Define colors for each finger
//   colors = [
//     color(197, 82, 95), // Index finger - #2DC5F4
//     color(283, 69, 63), // Middle finger - #9253A1
//     color(344, 100, 93), // Ring finger - #EC015A
//     color(32, 68, 97) // Pinky finger - #F89E4F
//   ];
//   selectedColor = colors[0];

//   video = createCapture(VIDEO, { flipped: true });
//   video.hide();
  
//   // Start detecting hands
//   handPose.detectStart(video, gotHands);
// }

// function draw() {
//   image(video, 0, 0);

//   if (hands.length > 0) {
//     let rightHand, leftHand;

//     // Separate detected hands into left and right
//     for (let hand of hands) {
//       if (hand.handedness === "Right") {
//         let index = hand.index_finger_tip;
//         let thumb = hand.thumb_tip;
//         rightHand = { index, thumb };
//       }
//       if (hand.handedness === "Left") {
//         let thumb = hand.thumb_tip;
//         let index = hand.index_finger_tip;
//         let middle = hand.middle_finger_tip;
//         let ring = hand.ring_finger_tip;
//         let pinky = hand.pinky_finger_tip;
//         let fingers = [index, middle, ring, pinky];

//         // Select color based on which finger is near the thumb
//         for (let i = 0; i < fingers.length; i++) {
//           let finger = fingers[i];
//           let d = dist(finger.x, finger.y, thumb.x, thumb.y);

//           if (d < 30) {
//             fill(colors[i]);
//             noStroke();
//             circle(finger.x, finger.y, 36);
//             selectedColor = colors[i];
//           }
//         }
//       }
//     }

//     // Draw with right-hand pinch
//     if (rightHand) {
//       let { index, thumb } = rightHand;
//       let x = (index.x + thumb.x) * 0.5;
//       let y = (index.y + thumb.y) * 0.5;
      
//       let d = dist(index.x, index.y, thumb.x, thumb.y);
//       if (d < 20) {
//         painting.stroke(selectedColor);
//         painting.strokeWeight(16);
//         painting.line(px, py, x, y);
//       }

//       px = x;
//       py = y;
//     }
//   }

//   // Overlay painting on top of the video
//   image(painting, 0, 0);
// }
