/* Clock.svg v0.1 (c) 2013 Wout Fierens - Svg.js is licensed under the terms of the MIT License */
SVG.Clock = function(size, options) {
  this.date = new Date;

  var i;
  var red = "#F8333C";
  var green = "#20BF55";
  var font = "Signika, sans-serif";

  /* create nested svg element */
  this.constructor.call(this, SVG.create('svg'));

  /* set attributes */
  this.viewbox(0, 0, 100, 100);
  this.size(size, size);

  /* create base plate */
  this.plate = this.ellipse(100, 100).fill("transparent")

  /* small bar every minute */
    for (i = 89; i >= 0; i--)
      if (i % 5 != 0)
        this.rect(1, 1).move(50, 5).fill("rgba(255,255,255,.1)").rotate(i * 4, 50, 50)
  /* bar every five minutes */
    for (i = 89; i >= 0; i--)
      this.rect(1, 3).move(50, 4).fill("rgba(255,255,255,.1)").rotate(i * 20, 50, 50)

  /* pomodoro1 */
  for (i = 59; i >= 0; i--)
    this.rect(1, 4).move(50, 0).fill(red).rotate(i * 1, 50, 50)
  /* break1 */
  for (i = 79; i >= 60; i--)
    this.rect(1, 4).move(50, 0).fill(green).rotate(i * 1, 50, 50)

  /* pomodoro2 */
  for (i = 139; i >= 80; i--)
    this.rect(1, 4).move(50, 0).fill(red).rotate(i * 1, 50, 50)
  /* break2 */
  for (i = 159; i >= 140; i--)
    this.rect(1, 4).move(50, 0).fill(green).rotate(i * 1, 50, 50)

  /* pomodoro3 */
  for (i = 219; i >= 160; i--)
    this.rect(1, 4).move(50, 0).fill(red).rotate(i * 1, 50, 50)
  /* break3 */
  for (i = 239; i >= 220; i--)
    this.rect(1, 4).move(50, 0).fill(green).rotate(i * 1, 50, 50)

  /* pomodoro4 */
  for (i = 299; i >= 240; i--)
    this.rect(1, 4).move(50, 0).fill(red).rotate(i * 1, 50, 50)
  /* break4-LARGE */
  for (i = 359; i >= 300; i--)
    this.rect(1, 4).move(50, 0).fill(green).rotate(i * 1, 50, 50)



  /* draw minute pointer */
  this.minutes = this.circle(4).move(49, 0).fill("#fff").stroke("#181A21");

  this.focusLabel = this.text('FOCUS').move(50, 25).fill(red).
    font({anchor: 'middle', size: 6, family: font, weight: '300', length: '50px'});

  this.focusTime = this.text("").move(50, 35).fill(red).
    font({anchor: 'middle', size: 24, family: font, weight: '700'});

  this.breakLabel = this.text('BREAK').move(50, 25).fill(green)
    .font({anchor: 'middle', size: 6, family: font, weight: '300'});

  this.breakTime = this.text("").move(50, 35).fill(green)
    .font({anchor: 'middle', size: 24, family: font, weight: '700'});
}

SVG.Clock.prototype = new SVG.Container

SVG.extend(SVG.Clock, {
  newMinutes: function() {
    const hour = this.date.getHours();
    const minute = this.date.getMinutes();
    // so cai o 9
    if (!(hour % 3)) {
      return minute;
    }

    // so cai o 10
    if (!((hour - 1) % 3)) {
      return minute < 30
        ? minute + 60
        : minute - 30;
    }

    // so cai as 11
    return minute + 30;
  },

  update: function(date) {
    this.date = date;
    this.drawMinutesPointer();
    var minutes = this.newMinutes();
    (minutes >= 15 && minutes <= 19) ||
    (minutes >= 35 && minutes <= 39) ||
    (minutes >= 55 && minutes <= 59) ||
    (minutes >= 75 && minutes <= 89) ? this.drawbreakLabels() : this.drawfocusLabels();
  },

  drawMinutesPointer: function() {
    this.minutes.rotate(360 + 360 / 5400 * ((this.newMinutes() * 60) + this.date.getSeconds()), 50, 50);
  },

  drawfocusLabels: function() {
    this.focusTime.text(this.timeLeftToString());
    this.focusLabel.show();
    this.focusTime.show();
    this.breakLabel.hide();
    this.breakTime.hide();
  },

  drawbreakLabels: function() {
    this.breakTime.text(this.timeLeftToString());
    this.breakLabel.show();
    this.breakTime.show();
    this.focusLabel.hide();
    this.focusTime.hide();
  },

  timeLeftToString: function() {
    return this.formatTime(this.minutesLeft(), 59 - this.date.getSeconds());
  },
  //15 + 5 + 15 + 5 + 15 + 5 + 15 + 15
  //  15  20   35  40   55  60   75   90
  minutesLeft: function() {
    var minutes = this.newMinutes();
    if (minutes < 15)
      return 14 - minutes;
    if (minutes < 20)
      return 19 - minutes;
    if (minutes < 35)
      return 34 - minutes;
    if (minutes < 40)
      return 39 - minutes;
    if (minutes < 55)
      return 54 - minutes;
    if (minutes < 60)
      return 59 - minutes;
    if (minutes < 75)
      return 74 - minutes;

      return 89 - minutes;
  },

  formatTime: function(minutes, seconds) {
    if (minutes < 10)
      minutes = "0" + minutes;

    if (seconds < 10)
      seconds = "0" + seconds;

    return minutes + ":" + seconds;
  }
})

// Extend SVG container
SVG.extend(SVG.Container, {
  // Add clock method
  clock: function(size) {
    return this.put(new SVG.Clock(size))
  }

})
