// // --- 타이핑 글자 저장용 리스트 ---
// let typedTexts = [];

// // Hand Pose Drawing with Color Selection
// let video;
// let handPose;
// let hands = [];
// let painting;
// let colors = [];
// let selectedColor;
// let drawEvery = 1000; 

// let prevFingers = {
//   index: { x: null, y: null },
//   middle: { x: null, y: null },
//   ring: { x: null, y: null },
//   pinky: { x: null, y: null },
//   thumb: { x: null, y: null }
// };

// // 마지막 리셋 시간 기록
// let lastResetTime;

// function preload() {
//   handPose = ml5.handPose({ flipped: true });
// }

// function setup() {
//   createCanvas(640, 480);
//   colorMode(HSB);

//   painting = createGraphics(640, 480);
//   painting.colorMode(HSB);
//   painting.clear();

//   colors = [
//     color(255, 255,), 
//     color(283, 69, 63), 
//     color(344, 100, 93),
//     color(32, 68, 97)
//   ];
//   selectedColor = colors[0];

//   // video camera 
//   video = createCapture(VIDEO, { flipped: true });
//   video.hide();

//   handPose.detectStart(video, gotHands);

//   // 초기 리셋 시간 기록
//   lastResetTime = millis();
// }

// function gotHands(results) {
//   hands = results;
// }

// // ============================
// //   키보드 입력 처리
// // ============================

// // 일반 문자 입력
// function keyTyped() {
//   typedTexts.push(key);
// }

// // 스페이스바, 엔터, 백스페이스 처리
// function keyPressed() {

//   // 스페이스 → 기본 스크롤 행동 방지
//   if (keyCode === 32) {   // 32 = Space
//     typedTexts.push(" ");
//     return false; 
//   }

//   // 엔터 → 줄바꿈 문자 저장
//   if (keyCode === ENTER) {
//     typedTexts.push("\n");
//     return false;
//   }

//   // 백스페이스 → 배열에서 마지막 글자 삭제
//   if (keyCode === BACKSPACE) {
//     typedTexts.pop();
//     return false;
//   }
// }

// function draw() {
//   image(video, 0, 0);
//   filter(GRAY); // 흑백 적용

//   // ============================
//   //  1분 리셋 처리
//   // ============================
//   if (millis() - lastResetTime > 60000) { // 60,000ms = 1분
//     typedTexts = [];
//     painting.clear();
//     lastResetTime = millis();
//   }

//   // ============================
//   //  입력된 글자를 화면에 표시
//   // ============================
//   push();
//   fill(255);
//   textSize(30);
//   let x = 50;
//   let y = 100;

//   for (let t of typedTexts) {

//     // 줄바꿈 문자 처리
//     if (t === "\n") {
//       x = 50;
//       y += 60;
//       continue;
//     }

//     // 기본 글자 표시
//     text(t, x, y);
//     x += textWidth(t) + 5; // 글자 폭 + 추가 여백

//     // 자동 줄바꿈
//     if (x > width - 100) {
//       x = 50;
//       y += 60;
//     }
//   }
//   pop();

//   // ============================
//   //  오른손/왼손 드로잉
//   // ============================
//   let rightHand = null;
//   let leftHand = null;

//   if (hands.length > 0) {
//     for (let hand of hands) {
//       let kp = hand.keypoints;

//       let index = kp.find(k => k.name === "index_finger_tip");
//       let middle = kp.find(k => k.name === "middle_finger_tip");
//       let ring = kp.find(k => k.name === "ring_finger_tip");
//       let pinky = kp.find(k => k.name === "pinky_finger_tip");
//       let thumb = kp.find(k => k.name === "thumb_tip");

//       if (hand.handedness === "Right") {
//         rightHand = { index, middle, ring, pinky, thumb };
//       } else if (hand.handedness === "Left") {
//         leftHand = { index, middle, ring, pinky, thumb };
//       }
//     }

//     // 오른손: 그림 그리기
//     if (rightHand) {
//       let fingers = {
//         index: rightHand.index,
//         middle: rightHand.middle,
//         ring: rightHand.ring,
//         pinky: rightHand.pinky,
//         thumb: rightHand.thumb
//       };

//       for (let name in fingers) {
//         let f = fingers[name];
//         let p = prevFingers[name];

//         if (p.x !== null && frameCount % drawEvery === 0) {
//           painting.stroke(selectedColor);
//           painting.strokeWeight(0.05);
//           painting.line(p.x, p.y, f.x, f.y);
//         }

//         p.x = f.x;
//         p.y = f.y;
//       }
//     }
//   }

//   if (leftHand) {
//     let fingers = {
//       index: leftHand.index,
//       middle: leftHand.middle,
//       ring: leftHand.ring,
//       pinky: leftHand.pinky,
//       thumb: leftHand.thumb
//     };

//     for (let name in fingers) {
//       let f = fingers[name];
//       let p = prevFingers[name];

//       if (p.x !== null) {
//         painting.stroke(selectedColor);
//         painting.strokeWeight(0.05);
//         painting.line(p.x, p.y, f.x, f.y);
//       }

//       p.x = f.x;
//       p.y = f.y;
//     }
//   }

//   image(painting, 0, 0);
// }



// =======================
//////for typeface //////
// =======================

// --- 타이핑 글자 저장용 리스트 ---
// let typedTexts = [];

// // Hand Pose Drawing with Color Selection
// let video;
// let handPose;
// let hands = [];
// let painting;
// let colors = [];
// let selectedColor;
// let drawEvery = 1000;

// let prevFingers = {
//   index: { x: null, y: null },
//   middle: { x: null, y: null },
//   ring: { x: null, y: null },
//   pinky: { x: null, y: null },
//   thumb: { x: null, y: null }
// };

// // 마지막 리셋 시간 기록
// let lastResetTime;

// // =======================
// //   폰트 변수 및 경로
// // =======================
// let myFont = null;
// let fontPath = "embodiedform4-Regular.otf";

// // =======================
// // 버튼 변수
// // =======================
// let resetButton, captureButton;

// function preload() {
//   loadFont(
//     fontPath,
//     (f) => { myFont = f; console.log("Font loaded:", fontPath); },
//     (err) => { console.error("Font failed to load:", fontPath, err); myFont = null; }
//   );
//   handPose = ml5.handPose({ flipped: true });
// }

// function setup() {
//   createCanvas(640, 480);
//   colorMode(HSB);

//   painting = createGraphics(640, 480);
//   painting.colorMode(HSB);
//   painting.clear();

//   colors = [
//     color(0, 0, 100),
//     color(283 % 360, 69, 63),
//     color(344 % 360, 100, 93),
//     color(32, 68, 97)
//   ];
//   selectedColor = colors[0];

//   video = createCapture(VIDEO, { flipped: true });
//   video.hide();

//   handPose.detectStart(video, gotHands);

//   lastResetTime = millis();

//   resetButton = createButton('Reset');
//   resetButton.position(10, height + 10);
//   resetButton.mousePressed(resetAll);

//   captureButton = createButton('Capture');
//   captureButton.position(80, height + 10);
//   captureButton.mousePressed(captureImage);
// }

// function gotHands(results) {
//   hands = results;
// }

// // 키보드 입력
// function keyTyped() { typedTexts.push(key); }

// function keyPressed() {
//   if (keyCode === 32) { typedTexts.push(" "); return false; }
//   if (keyCode === ENTER) { typedTexts.push("\n"); return false; }
//   if (keyCode === BACKSPACE) { typedTexts.pop(); return false; }
// }

// // 버튼 콜백
// function resetAll() {
//   typedTexts = [];
//   painting.clear();
//   lastResetTime = millis();
// }

// // ============================
// // 캡처: 비디오(흑백) + 손 그림 + 폰트 텍스트 포함
// // ============================
// function captureImage() {
//   let combined = createGraphics(width, height);
//   combined.image(video, 0, 0);
//   combined.filter(GRAY); // 흑백
//   combined.image(painting, 0, 0);

//   // 폰트 텍스트 그리기
//   combined.fill(255);
//   combined.textSize(200);
//   if (myFont) combined.textFont(myFont);

//   let x = 50;
//   let y = 100;
//   for (let t of typedTexts) {
//     if (t === "\n") { x = 50; y += 100; continue; } // 줄간격 넓힘
//     combined.text(t, x, y);
//     x += combined.textWidth(t) + 5;
//     if (x > width - 100) { x = 50; y += 100; }
//   }

//   save(combined, 'hand_drawing_capture.png');
// }

// // 메인 draw
// function draw() {
//   image(video, 0, 0);
//   filter(GRAY);

//   if (millis() - lastResetTime > 60000) {
//     typedTexts = [];
//     painting.clear();
//     lastResetTime = millis();
//   }

//   // 타이핑 텍스트 표시
//   push();
//   fill(255);
//   textSize(0);
//   if (myFont) textFont(myFont);

//   let x = 50;
//   let y = 100;
//   for (let t of typedTexts) {
//     if (t === "\n") { x = 50; y += 100; continue; } // 줄간격 넓힘
//     text(t, x, y);
//     x += textWidth(t) + 5;
//     if (x > width - 100) { x = 50; y += 100; }
//   }
//   pop();

//   // 손 드로잉
//   let rightHand = null;
//   let leftHand = null;

//   if (hands.length > 0) {
//     for (let hand of hands) {
//       let kp = hand.keypoints;
//       let index = kp.find(k => k.name === "index_finger_tip");
//       let middle = kp.find(k => k.name === "middle_finger_tip");
//       let ring = kp.find(k => k.name === "ring_finger_tip");
//       let pinky = kp.find(k => k.name === "pinky_finger_tip");
//       let thumb = kp.find(k => k.name === "thumb_tip");

//       if (hand.handedness === "Right") rightHand = { index, middle, ring, pinky, thumb };
//       else if (hand.handedness === "Left") leftHand = { index, middle, ring, pinky, thumb };
//     }
//     if (rightHand) drawFingers(rightHand, true);
//   }
//   if (leftHand) drawFingers(leftHand, false);

//   image(painting, 0, 0);
// }

// // 손 드로잉
// function drawFingers(handObj, isRight) {
//   let fingers = { ...handObj };
//   for (let name in fingers) {
//     let f = fingers[name];
//     let p = prevFingers[name];
//     if (p.x !== null && (isRight ? frameCount % drawEvery === 0 : true)) {
//       painting.stroke(selectedColor);
//       painting.strokeWeight(0.05);
//       painting.line(p.x, p.y, f.x, f.y);
//     }
//     p.x = f.x;
//     p.y = f.y;
//   }
// }


//// FONT 2 /////
// --- 타이핑 글자 저장용 리스트 ---
// --- 타이핑 글자 저장용 리스트 ---
// --- 타이핑 글자 저장용 리스트 ---
let typedTexts = [];

// Hand Pose Drawing with Color Selection
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

let lastResetTime;

// =======================
//   폰트 변수 (2개)
// =======================
let myFont1 = null;
let myFont2 = null;
let currentFont = null;

// 폰트 경로
let fontPath1 = "embodiedform4-Regular.otf";   // analog
let fontPath2 = "embodiedform5-Regular.otf";   // digital

// 폰트별 텍스트 사이즈 + 줄간격
let currentTextSize = 50;
let currentLineSpacing = 40;

// =======================
// 버튼 변수
// =======================
let resetButton, captureButton;
let fontBtn1, fontBtn2;

function preload() {
  loadFont(fontPath1, (f) => {
    myFont1 = f;
    currentFont = f;
    currentTextSize = 200;
    currentLineSpacing = currentTextSize * 0.7;  // analog 줄간격 좁게
  });

  loadFont(fontPath2, (f) => { 
    myFont2 = f;
  });

  handPose = ml5.handPose({ flipped: true });
}

function setup() {
  createCanvas(640, 480);
  colorMode(HSB);

  painting = createGraphics(640, 480);
  painting.colorMode(HSB);
  painting.clear();

  colors = [
    color(0, 0, 100),
    color(283 % 360, 69, 63),
    color(344 % 360, 100, 93),
    color(32, 68, 97)
  ];
  selectedColor = colors[0];

  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  handPose.detectStart(video, gotHands);

  lastResetTime = millis();

  resetButton = createButton('Reset');
  resetButton.position(10, height + 10);
  resetButton.mousePressed(resetAll);

  captureButton = createButton('Capture');
  captureButton.position(80, height + 10);
  captureButton.mousePressed(captureImage);

  // ===== Font Buttons =====
  fontBtn1 = createButton("analog-based font");
  fontBtn1.position(160, height + 10);
  fontBtn1.mousePressed(() => {
    currentFont = myFont1;
    currentTextSize = 200;
    currentLineSpacing = currentTextSize * 0.7; // 좁게
  });

  fontBtn2 = createButton("digital-based font");
  fontBtn2.position(300, height + 10);
  fontBtn2.mousePressed(() => {
    currentFont = myFont2;
    currentTextSize = 50;
    currentLineSpacing = currentTextSize * 1.0; // 넓게
  });
}

function gotHands(results) {
  hands = results;
}

// 키보드 입력
function keyTyped() { typedTexts.push(key); }

function keyPressed() {
  if (keyCode === 32) { typedTexts.push(" "); return false; }
  if (keyCode === ENTER) { typedTexts.push("\n"); return false; }
  if (keyCode === BACKSPACE) { typedTexts.pop(); return false; }
}

function resetAll() {
  typedTexts = [];
  painting.clear();
  lastResetTime = millis();
}

// ============================
// 캡처: 비디오 + 손 드로잉 + 텍스트
// ============================
function captureImage() {
  let combined = createGraphics(width, height);
  combined.image(video, 0, 0);
  combined.filter(GRAY);
  combined.image(painting, 0, 0);

  combined.fill(255);
  combined.textSize(currentTextSize);
  combined.textFont(currentFont);

  let x = 50;
  let y = 100;

  for (let t of typedTexts) {
    if (t === "\n") { 
      x = 50; 
      y += currentLineSpacing; 
      continue; 
    }
    combined.text(t, x, y);
    x += combined.textWidth(t) + 5;
    if (x > width - 100) { 
      x = 50; 
      y += currentLineSpacing; 
    }
  }

  save(combined, 'hand_drawing_capture.png');
}

function draw() {
  image(video, 0, 0);
  filter(GRAY);

  if (millis() - lastResetTime > 60000) {
    typedTexts = [];
    painting.clear();
    lastResetTime = millis();
  }

  // 텍스트 출력
  push();
  fill(255);
  textSize(currentTextSize);
  textFont(currentFont);

  let x = 50;
  let y = 100;

  for (let t of typedTexts) {
    if (t === "\n") { 
      x = 50; 
      y += currentLineSpacing; 
      continue; 
    }
    text(t, x, y);
    x += textWidth(t) + 5;
    if (x > width - 100) { 
      x = 50; 
      y += currentLineSpacing; 
    }
  }
  pop();

  // 손 드로잉
  let rightHand = null;
  let leftHand = null;

  if (hands.length > 0) {
    for (let hand of hands) {
      let kp = hand.keypoints;
      let index = kp.find(k => k.name === "index_finger_tip");
      let middle = kp.find(k => k.name === "middle_finger_tip");
      let ring = kp.find(k => k.name === "ring_finger_tip");
      let pinky = kp.find(k => k.name === "pinky_finger_tip");
      let thumb = kp.find(k => k.name === "thumb_tip");

      if (hand.handedness === "Right") rightHand = { index, middle, ring, pinky, thumb };
      else if (hand.handedness === "Left") leftHand = { index, middle, ring, pinky, thumb };
    }
    if (rightHand) drawFingers(rightHand, true);
  }

  if (leftHand) drawFingers(leftHand, false);

  image(painting, 0, 0);
}

function drawFingers(handObj, isRight) {
  let fingers = { ...handObj };
  for (let name in fingers) {
    let f = fingers[name];
    let p = prevFingers[name];
    if (p.x !== null && (isRight ? frameCount % drawEvery === 0 : true)) {
      painting.stroke(selectedColor);
      painting.strokeWeight(0.05);
      painting.line(p.x, p.y, f.x, f.y);
    }
    p.x = f.x;
    p.y = f.y;
  }
}
