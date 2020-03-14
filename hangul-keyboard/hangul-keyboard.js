function hangulKeyboard() {
  var a = {};
  a.util = {
      mobile: /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent),
      opera: ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0),
      mozilla: (typeof InstallTrigger !== "undefined"),
      windowWidth: function() {
          var i = window.document.documentElement.clientWidth,
              e = window.document.body;
          return window.document.compatMode === "CSS1Compat" && i || e && e.clientWidth || i
      },
      code: function(i) {
          if (!i) {
              var i = window.event
          }
          if (i.code != undefined && i.key != undefined) {
              return i.code
          }
          return "Unidentified"
      },
      keyCode: function(t) {
          if (!t) {
              var t = window.event
          }
          if (this.mozilla) {
              var i = t.keyCode;
              switch (i) {
                  case 59:
                      i = 186;
                      break;
                  case 107:
                      i = 187;
                      break;
                  case 109:
                      i = 189;
                      break;
                  case 61:
                      i = 187;
                      break;
                  case 173:
                      i = 189;
                      break
              }
              return i
          }
          if (this.opera) {
              var i = t.keyCode;
              switch (i) {
                  case 59:
                      i = 186;
                      break;
                  case 61:
                      i = 187;
                      break;
                  case 109:
                      i = 189;
                      break
              }
              return i
          }
          return t.keyCode
      },
      isCtrl: function(i) {
          if (!i) {
              var i = window.event
          }
          return i.ctrlKey
      },
      isAlt: function(i) {
          if (!i) {
              var i = window.event
          }
          return i.altKey
      },
      isShift: function(i) {
          if (!i) {
              var i = window.event
          }
          return i.shiftKey
      },
      preventDefault: function(i) {
          if (!i) {
              var i = window.event
          }
          i.preventDefault ? i.preventDefault() : (i.returnValue = false)
      },
      srcId: function(i, t, v) {
          if (!i) {
              var i = window.event
          }
          var u;
          if (i.target) {
              u = i.target
          } else {
              if (i.srcElement) {
                  u = i.srcElement
              }
          }
          if (u.nodeType == 3) {
              u = target.parentNode
          }
          while (u.tagName.toLowerCase() != v) {
              u = u.parentNode;
              if (u == t || u.tagName.toLowerCase() == "body") {
                  return null
              }
          }
          return u.id
      },
      insertAtCaret: function(i, w) {
          if (i.readOnly) {
              i.value += w
          } else {
              var v = this.getSelectionStart(i);
              var t = this.getSelectionEnd(i);
              var u = i.value.length;
              i.value = i.value.substring(0, v) + w + i.value.substring(t, u);
              this.setCaretPosition(i, v + w.length, 0)
          }
      },
      deleteAtCaret: function(u, t, i) {
          if (u.readOnly) {
              var z = u.value;
              u.value = z.substring(0, z.length - t);
              return z.substr(z.length - t)
          }
          var x = this.getSelectionStart(u);
          var v = this.getSelectionEnd(u);
          var w = u.value.length;
          if (t > x) {
              t = x
          }
          if (v + i > w) {
              i = w - v
          }
          var y = u.value.substring(x - t, v + i);
          u.value = u.value.substring(0, x - t) + u.value.substring(v + i);
          this.setCaretPosition(u, x - t, 0);
          return y
      },
      getSelectionStart: function(i) {
          i.focus();
          if (i.selectionStart !== undefined) {
              return i.selectionStart
          } else {
              if (document.selection) {
                  var t = document.selection.createRange();
                  if (t == null) {
                      return 0
                  }
                  var v = i.createTextRange();
                  var u = v.duplicate();
                  v.moveToBookmark(t.getBookmark());
                  u.setEndPoint("EndToStart", v);
                  return u.text.length
              }
          }
          return 0
      },
      getSelectionEnd: function(i) {
          i.focus();
          if (i.selectionEnd !== undefined) {
              return i.selectionEnd
          } else {
              if (document.selection) {
                  var t = document.selection.createRange();
                  if (t == null) {
                      return 0
                  }
                  var v = i.createTextRange();
                  var u = v.duplicate();
                  v.moveToBookmark(t.getBookmark());
                  u.setEndPoint("EndToStart", v);
                  return u.text.length + t.text.length
              }
          }
          return i.value.length
      },
      setCaretPosition: function(t, v, i) {
          var u = t.value.length;
          if (v > u) {
              v = u
          }
          if (v + i > u) {
              i = u - i
          }
          t.focus();
          if (t.setSelectionRange) {
              t.setSelectionRange(v, v + i)
          } else {
              if (t.createTextRange) {
                  var w = t.createTextRange();
                  w.collapse(true);
                  w.moveEnd("character", v + i);
                  w.moveStart("character", v);
                  w.select()
              }
          }
          t.focus()
      },
      selectAll: function(i) {
          this.setCaretPosition(i, 0, i.value.length)
      }
  };
  a.layout = function() {
      this.keys = [];
      this.deadkeys = [];
      this.dir = "ltr";
      this.name = "US";
      this.lang = "en"
  };
  a.layout.prototype.loadDefault = function() {
      this.keys = [{
          i: "k0",
          c: "0",
          n: "`",
          s: "~"
      }, {
          i: "k1",
          c: "0",
          n: "1",
          s: "!"
      }, {
          i: "k2",
          c: "0",
          n: "2",
          s: "@"
      }, {
          i: "k3",
          c: "0",
          n: "3",
          s: "#"
      }, {
          i: "k4",
          c: "0",
          n: "4",
          s: "$"
      }, {
          i: "k5",
          c: "0",
          n: "5",
          s: "%"
      }, {
          i: "k6",
          c: "0",
          n: "6",
          s: "^"
      }, {
          i: "k7",
          c: "0",
          n: "7",
          s: "&"
      }, {
          i: "k8",
          c: "0",
          n: "8",
          s: "*"
      }, {
          i: "k9",
          c: "0",
          n: "9",
          s: "("
      }, {
          i: "k10",
          c: "0",
          n: "0",
          s: ")"
      }, {
          i: "k11",
          c: "0",
          n: "-",
          s: "_"
      }, {
          i: "k12",
          c: "0",
          n: "=",
          s: "+"
      }, {
          i: "k13",
          c: "1",
          n: "q",
          s: "Q"
      }, {
          i: "k14",
          c: "1",
          n: "w",
          s: "W"
      }, {
          i: "k15",
          c: "1",
          n: "e",
          s: "E"
      }, {
          i: "k16",
          c: "1",
          n: "r",
          s: "R"
      }, {
          i: "k17",
          c: "1",
          n: "t",
          s: "T"
      }, {
          i: "k18",
          c: "1",
          n: "y",
          s: "Y"
      }, {
          i: "k19",
          c: "1",
          n: "u",
          s: "U"
      }, {
          i: "k20",
          c: "1",
          n: "i",
          s: "I"
      }, {
          i: "k21",
          c: "1",
          n: "o",
          s: "O"
      }, {
          i: "k22",
          c: "1",
          n: "p",
          s: "P"
      }, {
          i: "k23",
          c: "0",
          n: "[",
          s: "{"
      }, {
          i: "k24",
          c: "0",
          n: "]",
          s: "}"
      }, {
          i: "k25",
          c: "0",
          n: "\\",
          s: "|"
      }, {
          i: "k26",
          c: "1",
          n: "a",
          s: "A"
      }, {
          i: "k27",
          c: "1",
          n: "s",
          s: "S"
      }, {
          i: "k28",
          c: "1",
          n: "d",
          s: "D"
      }, {
          i: "k29",
          c: "1",
          n: "f",
          s: "F"
      }, {
          i: "k30",
          c: "1",
          n: "g",
          s: "G"
      }, {
          i: "k31",
          c: "1",
          n: "h",
          s: "H"
      }, {
          i: "k32",
          c: "1",
          n: "j",
          s: "J"
      }, {
          i: "k33",
          c: "1",
          n: "k",
          s: "K"
      }, {
          i: "k34",
          c: "1",
          n: "l",
          s: "L"
      }, {
          i: "k35",
          c: "0",
          n: ";",
          s: ":"
      }, {
          i: "k36",
          c: "0",
          n: "'",
          s: '"'
      }, {
          i: "k37",
          c: "1",
          n: "z",
          s: "Z"
      }, {
          i: "k38",
          c: "1",
          n: "x",
          s: "X"
      }, {
          i: "k39",
          c: "1",
          n: "c",
          s: "C"
      }, {
          i: "k40",
          c: "1",
          n: "v",
          s: "V"
      }, {
          i: "k41",
          c: "1",
          n: "b",
          s: "B"
      }, {
          i: "k42",
          c: "1",
          n: "n",
          s: "N"
      }, {
          i: "k43",
          c: "1",
          n: "m",
          s: "M"
      }, {
          i: "k44",
          c: "0",
          n: ",",
          s: "<"
      }, {
          i: "k45",
          c: "0",
          n: ".",
          s: ">"
      }, {
          i: "k46",
          c: "0",
          n: "/",
          s: "?"
      }, {
          i: "k47",
          c: "0",
          n: "\\",
          s: "|"
      }];
      this.dir = "ltr";
      this.name = "US";
      this.lang = "en"
  };
  a.layout.prototype.load = function(e) {
      this.keys = e.keys;
      this.deadkeys = e.deadkeys;
      this.dir = e.dir;
      this.name = e.name;
      this.lang = e.lang ? e.lang : "en"
  };
  a.layout.parser = {
      keys: {
          "192": "Backquote",
          "49": "Digit1",
          "50": "Digit2",
          "51": "Digit3",
          "52": "Digit4",
          "53": "Digit5",
          "54": "Digit6",
          "55": "Digit7",
          "56": "Digit8",
          "57": "Digit9",
          "48": "Digit0",
          "189": "Minus",
          "187": "Equal",
          "81": "KeyQ",
          "87": "KeyW",
          "69": "KeyE",
          "82": "KeyR",
          "84": "KeyT",
          "89": "KeyY",
          "85": "KeyU",
          "73": "KeyI",
          "79": "KeyO",
          "80": "KeyP",
          "219": "BracketLeft",
          "221": "BracketRight",
          "220": "Backslash",
          "65": "KeyA",
          "83": "KeyS",
          "68": "KeyD",
          "70": "KeyF",
          "71": "KeyG",
          "72": "KeyH",
          "74": "KeyJ",
          "75": "KeyK",
          "76": "KeyL",
          "186": "Semicolon",
          "222": "Quote",
          "90": "KeyZ",
          "88": "KeyX",
          "67": "KeyC",
          "86": "KeyV",
          "66": "KeyB",
          "78": "KeyN",
          "77": "KeyM",
          "188": "Comma",
          "190": "Period",
          "191": "Slash",
          "17": "ControlLeft",
          "18": "AltLeft",
          "16": "ShiftLeft",
          "32": "Space",
          "27": "Escape",
          "20": "CapsLock",
          "13": "Enter"
      },
      codes: {
          Backquote: 0,
          Digit1: 1,
          Digit2: 2,
          Digit3: 3,
          Digit4: 4,
          Digit5: 5,
          Digit6: 6,
          Digit7: 7,
          Digit8: 8,
          Digit9: 9,
          Digit0: 10,
          Minus: 11,
          Equal: 12,
          KeyQ: 13,
          KeyW: 14,
          KeyE: 15,
          KeyR: 16,
          KeyT: 17,
          KeyY: 18,
          KeyU: 19,
          KeyI: 20,
          KeyO: 21,
          KeyP: 22,
          BracketLeft: 23,
          BracketRight: 24,
          Backslash: 25,
          KeyA: 26,
          KeyS: 27,
          KeyD: 28,
          KeyF: 29,
          KeyG: 30,
          KeyH: 31,
          KeyJ: 32,
          KeyK: 33,
          KeyL: 34,
          Semicolon: 35,
          Quote: 36,
          KeyZ: 37,
          KeyX: 38,
          KeyC: 39,
          KeyV: 40,
          KeyB: 41,
          KeyN: 42,
          KeyM: 43,
          Comma: 44,
          Period: 45,
          Slash: 46,
          Backslash: 47
      },
      getKeyLegend: function(u, t) {
          var v = u.length;
          for (var e = 0; e < v; e++) {
              if (u[e].i == t) {
                  return (u[e].n ? u[e].n : "")
              }
          }
          return 0
      },
      getKey: function(u, t) {
          var v = u.length;
          for (var e = 0; e < v; e++) {
              if (u[e].i == t) {
                  return u[e]
              }
          }
          return null
      },
      isDeadkey: function(e, v) {
          if (!e) {
              return false
          }
          var u = e.length;
          for (var t = 0; t < u; t++) {
              if (e[t].k == v) {
                  return true
              }
          }
          return false
      },
      getMappedValue: function(e, w, v) {
          if (!e) {
              return ""
          }
          var u = e.length;
          for (var t = 0; t < u; t++) {
              if (e[t].k == v && e[t].b == w) {
                  return e[t].c
              }
          }
          return ""
      },
      getState: function(u, e, v, i, t) {
          var w = "n";
          if (!e && !v && u) {
              w = "n"
          } else {
              if (!e && v && !u) {
                  w = "s"
              } else {
                  if (!e && v && u) {
                      w = "s"
                  } else {
                      if (e && !v && !u) {
                          w = "n"
                      } else {
                          if (e && !v && u) {
                              w = "t"
                          } else {
                              if (e && v && !u) {
                                  w = "s"
                              } else {
                                  if (e && v && u) {
                                      w = "f"
                                  }
                              }
                          }
                      }
                  }
              }
          }
          if ((w == "n" || w == "s") && i) {
              if (t == "1") {
                  if (w == "n") {
                      w = "s"
                  } else {
                      w = "n"
                  }
              }
              if (t == "SGCap") {
                  if (w == "n") {
                      w = "y"
                  } else {
                      if (w == "s") {
                          w = "z"
                      }
                  }
              }
          }
          return w
      }
  };
  a.keyboard = function(e, v) {
      this.defaultLayout = new a.layout();
      this.defaultLayout.loadDefault();
      this.virtualLayout = new a.layout();
      this.virtualLayout.loadDefault();
      this.currentLayout = this.virtualLayout;
      this.shift = false;
      this.shiftOn = false;
      this.caps = false;
      this.capsOn = false;
      this.alt = false;
      this.ctrl = false;
      this.altCtrlOn = false;
      this.fontSize = 18;
      this.counter = 0;
      this.interval = 0;
      this.prev = "";
      this.cancelkeypress = false;
      this.customOnBackspace = function(i) {};
      this.customOnEnter = function() {};
      this.customOnSpace = function() {
          return false
      };
      this.customOnKey = function(i) {
          return false
      };
      this.customOnEsc = function() {};
      this.customDrawKeyboard = function(i) {
          return i
      };
      this.textbox = document.getElementById(v);
      this.textbox.style.fontSize = "18px";
      if (a.util.mobile) {
          this.textbox.readOnly = true
      }
      var u = ['<div id="hangul-keyboard">'];
      if (a.util.windowWidth() < 640) {
          for (var t = 13; t < 23; t++) {
              u.push('<button id="hangul-k', t, '" class="hangul-key"></button>')
          }
          for (var t = 26; t < 35; t++) {
              u.push('<button id="hangul-k', t, '" class="hangul-key"></button>')
          }
          for (var t = 37; t < 44; t++) {
              u.push('<button id="hangul-k', t, '" class="hangul-key"></button>')
          }
          u.push('<button id="hangul-left-shift"><span>Shift</span></button>');
          u.push('<button id="hangul-caps-lock"><span>Caps</span></button>');
          u.push('<button id="hangul-escape" title="Turn on/off keyboard input conversion"><span>Esc</span></button>');
          u.push('<button id="hangul-space"><span>Space</span></button>');
          u.push('<button id="hangul-enter" class="hangul-enter"><span>Enter</span></button>');
          u.push('<button id="hangul-left-ctrl"><span>Ctrl+Alt</span></button>');
          u.push('<button id="hangul-left-alt" style="display:none"><span>Alt</span></button>');
          u.push('<button id="hangul-backspace"><span>Back</span></button>');
          for (var t = 0; t < 13; t++) {
              u.push('<button id="hangul-k', t, '" class="hangul-key"></button>')
          }
          for (var t = 23; t < 26; t++) {
              u.push('<button id="hangul-k', t, '" class="hangul-key"></button>')
          }
          for (var t = 35; t < 37; t++) {
              u.push('<button id="hangul-k', t, '" class="hangul-key"></button>')
          }
          for (var t = 44; t < 48; t++) {
              u.push('<button id="hangul-k', t, '" class="hangul-key"></button>')
          }
      } else {
          for (var t = 0; t < 13; t++) {
              u.push('<button id="hangul-k', t, '" class="hangul-key"></button>')
          }
          u.push('<button id="hangul-backspace"><span>Backspace</span></button>');
          u.push('<button id="hangul-tab"><span>Tab</span></button>');
          for (var t = 13; t < 25; t++) {
              u.push('<button id="hangul-k', t, '" class="hangul-key"></button>')
          }
          u.push('<button id="hangul-k25"></button>');
          u.push('<button id="hangul-caps-lock"><span>Caps Lock</span></button>');
          for (var t = 26; t < 37; t++) {
              u.push('<button id="hangul-k', t, '" class="hangul-key"></button>')
          }
          u.push('<button id="hangul-enter" class="hangul-enter"><span>Enter</span></button>');
          u.push('<button id="hangul-left-shift"><span>Shift</span></button>');
          u.push('<button id="hangul-k47" class="hangul-key"></button>');
          for (var t = 37; t < 47; t++) {
              u.push('<button id="hangul-k', t, '" class="hangul-key"></button>')
          }
          u.push('<button id="hangul-right-shift"><span>Shift</span></button>');
          u.push('<button id="hangul-left-ctrl"><span>Ctrl</span></button>');
          u.push('<button id="hangul-clear"><span>Clear</span></button>');
          u.push('<button id="hangul-left-alt"><span>Alt</span></button>');
          u.push('<button id="hangul-space"><span>Space</span></button>');
          u.push('<button id="hangul-right-alt"><span>Alt</span></button>');
          u.push('<button id="hangul-escape" title="Turn on/off keyboard input conversion"><span>Esc</span></button>');
          u.push('<button id="hangul-right-ctrl"><span>Ctrl</span></button>');
      }
      u.push("</div>");
      document.getElementById(e).innerHTML = u.join("");
      this.wireEvents();
      this.drawKeyboard()
  };
  a.keyboard.prototype.loadDefaultLayout = function(e) {
      this.defaultLayout.load(e);
      this.drawKeyboard()
  };
  a.keyboard.prototype.loadVirtualLayout = function(e) {
      this.virtualLayout.load(e);
      this.drawKeyboard();
      this.textbox.style.direction = this.attr("dir")
  };
  a.keyboard.prototype.switchLayout = function() {
      this.currentLayout = (this.currentLayout === this.defaultLayout) ? this.virtualLayout : this.defaultLayout;
      this.reset();
      this.drawKeyboard();
      this.textbox.style.direction = this.attr("dir")
  };
  a.keyboard.prototype.getFontSize = function() {
      return this.fontSize
  };
  a.keyboard.prototype.setFontSize = function(e) {
      this.fontSize = e;
      this.textbox.style.fontSize = this.fontSize + "px"
  };
  a.keyboard.prototype.onEsc = function() {
      this.switchLayout();
      this.customOnEsc()
  };
  a.keyboard.prototype.onShift = function() {
      this.shift = !this.shift;
      this.drawKeyboard()
  };
  a.keyboard.prototype.onAlt = function() {
      this.alt = !this.alt;
      this.drawKeyboard()
  };
  a.keyboard.prototype.onCtrl = function() {
      this.ctrl = !this.ctrl;
      this.drawKeyboard()
  };
  a.keyboard.prototype.onCapsLock = function() {
      this.caps = !this.caps;
      this.drawKeyboard()
  };
  a.keyboard.prototype.onBackspace = function() {
      if (this.prev != "") {
          this.prev = "";
          this.shift = false;
          this.drawKeyboard()
      } else {
          var e = a.util.deleteAtCaret(this.textbox, 1, 0);
          this.customOnBackspace(e)
      }
  };
  a.keyboard.prototype.onEnter = function() {
      a.util.insertAtCaret(this.textbox, "\u000A");
      this.customOnEnter()
  };
  a.keyboard.prototype.onSpace = function() {
      if (!this.customOnSpace()) {
          a.util.insertAtCaret(this.textbox, "\u0020")
      }
  };
  a.keyboard.prototype.onClear = function() {
    this.textbox.value = '';
  };
  a.keyboard.prototype.attr = function(e) {
      if (e == "dir") {
          return this.currentLayout.dir
      } else {
          if (e == "lang") {
              return this.currentLayout.lang
          } else {
              if (e == "name") {
                  return this.currentLayout.name
              }
          }
      }
      return ""
  };
  a.keyboard.prototype.reset = function() {
      this.shift = false;
      this.caps = false;
      this.alt = false;
      this.ctrl = false;
      this.counter = 0;
      this.interval = 0;
      this.prev = ""
  };
  a.keyboard.prototype.stopRepeat = function() {
      if (this.interval != 0) {
          clearInterval(this.interval);
          this.counter = 0;
          this.interval = 0
      }
  };
  a.keyboard.prototype.onKey = function(i) {
      var e = a.layout.parser.getKey(this.currentLayout.keys, i);
      if (e) {
          var u = a.layout.parser.getState(this.ctrl, this.alt, this.shift, this.caps, e.c ? e.c : "0");
          var v = e[u] ? e[u] : "";
          if (this.prev != "") {
              var t = a.layout.parser.getMappedValue(this.currentLayout.deadkeys, v, this.prev);
              if (t != "") {
                  a.util.insertAtCaret(this.textbox, t)
              }
              this.prev = ""
          } else {
              if (a.layout.parser.isDeadkey(this.currentLayout.deadkeys, v)) {
                  this.prev = v
              } else {
                  if (v != "") {
                      if (!this.customOnKey(v)) {
                          a.util.insertAtCaret(this.textbox, v)
                      }
                  }
              }
          }
      }
  };
  a.keyboard.prototype.drawKeyboard = function() {
      if (!this.currentLayout.keys) {
          return
      }
      var C, E, H, I;
      var F = this.currentLayout.keys.length;
      for (var D = 0; D < F; D++) {
          E = this.currentLayout.keys[D];
          if (!document.getElementById("hangul-" + E.i)) {
              continue
          }
          var B = this.ctrl;
          var e = this.alt;
          var G = this.shift;
          var A = this.caps;
          if (this.shiftOn) {
              G = true
          }
          if (this.capsOn) {
              A = true
          }
          if (this.altCtrlOn) {
              B = true;
              e = true
          }
          H = a.layout.parser.getState(B, e, G, A, E.c ? E.c : "0");
          I = E[H] ? E[H] : "";
          if (this.prev != "") {
              I = a.layout.parser.getMappedValue(this.currentLayout.deadkeys, I, this.prev)
          }
          C = [];
          C.push('<div class="hangul-label-reference">', a.layout.parser.getKeyLegend(this.defaultLayout.keys, E.i), "</div>");
          if (!G) {
              I = this.customDrawKeyboard(I);
              if (I == "") {
                  I = "&nbsp;"
              }
              C.push('<div class="hangul-label-natural" style="font-size:', this.fontSize, 'px;">&nbsp;', I, "</div>")
          } else {
              if (I == "") {
                  I = "&nbsp;"
              }
              C.push('<div class="hangul-label-shift" style="font-size:', this.fontSize, 'px;">&nbsp;', I, "</div>")
          }
          document.getElementById("hangul-" + E.i).innerHTML = C.join("")
      }
      var v = document.getElementById("hangul-left-ctrl");
      var y = document.getElementById("hangul-right-ctrl");
      if (v && y) {
          if (B) {
              v.className = "hangul-recessed" + (this.ctrl ? "" : "-hover");
              y.className = "hangul-recessed" + (this.ctrl ? "" : "-hover")
          } else {
              v.className = "";
              y.className = ""
          }
      }
      var u = document.getElementById("hangul-left-alt");
      var x = document.getElementById("hangul-right-alt");
      if (u && x) {
          if (e) {
              u.className = "hangul-recessed" + (this.alt ? "" : "-hover");
              x.className = "hangul-recessed" + (this.alt ? "" : "-hover")
          } else {
              u.className = "";
              x.className = ""
          }
      }
      var w = document.getElementById("hangul-left-shift");
      var z = document.getElementById("hangul-right-shift");
      if (w && z) {
          if (G) {
              w.className = "hangul-recessed" + (this.shift ? "" : "-hover");
              z.className = "hangul-recessed" + (this.shift ? "" : "-hover")
          } else {
              w.className = "";
              z.className = ""
          }
      }
      var t = document.getElementById("hangul-caps-lock");
      if (t) {
          if (A) {
              t.className = "hangul-recessed" + (this.caps ? "" : "-hover")
          } else {
              t.className = ""
          }
      }
  };
  a.keyboard.prototype.wireEvents = function() {
      var e = this;
      document.getElementById("hangul-keyboard").onmousedown = function(i) {
          var t = a.util.srcId(i, this, "button");
          if (!t) {
              return
          }
          e.interval = setInterval(function() {
              e.counter++;
              if (e.counter > 5) {
                  switch (t) {
                      case "hangul-backspace":
                          e.onBackspace();
                          break;
                      case "hangul-enter":
                          e.onEnter();
                          break;
                      default:
                          if (t.search("hangul-k([0-9])|([1-3][0-9])|(4[0-7])") != -1) {
                              e.onKey(t.substr(7));
                              e.shift = false;
                              e.alt = false;
                              e.ctrl = false;
                              e.drawKeyboard()
                          }
                          break
                  }
              }
          }, 50)
      };
      document.getElementById("hangul-keyboard").onmouseup = function(i) {
          e.stopRepeat()
      };
      document.getElementById("hangul-keyboard").onmouseout = function(i) {
          e.stopRepeat()
      };
      document.getElementById("hangul-keyboard").onclick = function(i) {
          var t = a.util.srcId(i, this, "button");
          if (!t) {
              return
          }
          switch (t) {
              case "hangul-left-shift":
              case "hangul-right-shift":
                  e.onShift();
                  break;
              case "hangul-left-alt":
              case "hangul-right-alt":
                  e.onCtrl();
                  e.onAlt();
                  break;
              case "hangul-left-ctrl":
              case "hangul-right-ctrl":
                  e.onAlt();
                  e.onCtrl();
                  break;
              case "hangul-escape":
                  e.onEsc();
                  break;
              case "hangul-caps-lock":
                  e.onCapsLock();
                  break;
              case "hangul-backspace":
                  e.onBackspace();
                  break;
              case "hangul-enter":
                  e.onEnter();
                  break;
              case "hangul-space":
                  e.onSpace();
                  break;
              case "hangul-clear":
                  e.onClear();
                  break;
              default:
                  if (t.search("hangul-k([0-9])|([1-3][0-9])|(4[0-7])") != -1) {
                      e.onKey(t.substr(7));
                      e.shift = false;
                      e.alt = false;
                      e.ctrl = false;
                      e.drawKeyboard()
                  }
                  break
          }
      };
      if (!("ontouchstart" in document.documentElement) || !a.util.mobile) {
          document.getElementById("hangul-left-shift").onmouseover = function(i) {
              e.shiftOn = true;
              e.drawKeyboard()
          };
          document.getElementById("hangul-right-shift").onmouseover = function(i) {
              e.shiftOn = true;
              e.drawKeyboard()
          };
          document.getElementById("hangul-left-shift").onmouseout = function(i) {
              e.shiftOn = false;
              e.drawKeyboard()
          };
          document.getElementById("hangul-right-shift").onmouseout = function(i) {
              e.shiftOn = false;
              e.drawKeyboard()
          };
          document.getElementById("hangul-left-ctrl").onmouseover = function(i) {
              e.altCtrlOn = true;
              e.drawKeyboard()
          };
          document.getElementById("hangul-right-ctrl").onmouseover = function(i) {
              e.altCtrlOn = true;
              e.drawKeyboard()
          };
          document.getElementById("hangul-left-ctrl").onmouseout = function(i) {
              e.altCtrlOn = false;
              e.drawKeyboard()
          };
          document.getElementById("hangul-right-ctrl").onmouseout = function(i) {
              e.altCtrlOn = false;
              e.drawKeyboard()
          };
          document.getElementById("hangul-left-alt").onmouseover = function(i) {
              e.altCtrlOn = true;
              e.drawKeyboard()
          };
          document.getElementById("hangul-right-alt").onmouseover = function(i) {
              e.altCtrlOn = true;
              e.drawKeyboard()
          };
          document.getElementById("hangul-left-alt").onmouseout = function(i) {
              e.altCtrlOn = false;
              e.drawKeyboard()
          };
          document.getElementById("hangul-right-alt").onmouseout = function(i) {
              e.altCtrlOn = false;
              e.drawKeyboard()
          };
          document.getElementById("hangul-caps-lock").onmouseover = function(i) {
              e.capsOn = true;
              e.drawKeyboard()
          };
          document.getElementById("hangul-caps-lock").onmouseout = function(i) {
              e.capsOn = false;
              e.drawKeyboard()
          }
      }
      e.textbox.onkeydown = function(t) {
          var i = a.util.code(t);
          if (i == "Unidentified") {
              var v = a.util.keyCode(t);
              i = a.layout.parser.keys[v + ""]
          }
          if ((i == "KeyA" || i == "KeyY" || i == "KeyZ" || i == "KeyC" || i == "KeyV" || i == "KeyX") && (e.ctrl && !e.alt && !e.shift)) {
              return
          }
          if (e.currentLayout == e.defaultLayout && i != "Escape") {
              return
          }
          switch (i) {
              case "ControlLeft":
              case "ControlRight":
                  e.ctrl = false;
                  e.onCtrl();
                  break;
              case "AltLeft":
              case "AltRight":
                  e.alt = false;
                  e.onAlt();
                  break;
              case "ShiftLeft":
              case "ShiftRight":
                  e.shift = false;
                  e.onShift();
                  break;
              case "Escape":
                  e.onEsc();
                  break;
              case "CapsLock":
                  if (t.getModifierState && t.getModifierState("CapsLock")) {
                      e.caps = false
                  }
                  e.onCapsLock();
                  break;
              case "Backspace":
                  e.onBackspace();
                  a.util.preventDefault(t);
                  break;
              case "Space":
                  e.onSpace();
                  a.util.preventDefault(t);
                  break;
              case "Enter":
                  e.onEnter();
                  a.util.preventDefault(t);
                  break;
              case "Clear":
                  e.onClear();
                  a.util.preventDefault(t);
              default:
                  var u = a.layout.parser.codes[i];
                  if (u != undefined) {
                      e.onKey("k" + u);
                      e.drawKeyboard();
                      a.util.preventDefault(t);
                      e.cancelkeypress = true
                  }
                  break
          }
      };
      if (a.util.opera) {
          e.textbox.onkeypress = function(i) {
              if (e.cancelkeypress) {
                  a.util.preventDefault(i);
                  e.cancelkeypress = false
              }
          }
      }
      e.textbox.onkeyup = function(t) {
          var i = a.util.code(t);
          if (i == "Unidentified") {
              var u = a.util.keyCode(t);
              i = a.layout.parser.keys[u + ""]
          }
          switch (i) {
              case "ControlLeft":
              case "ControlRight":
                  e.ctrl = true;
                  e.onCtrl();
                  break;
              case "AltLeft":
              case "AltRight":
                  e.alt = true;
                  e.onAlt();
                  break;
              case "ShiftLeft":
              case "ShiftRight":
                  e.shift = true;
                  e.onShift();
                  break;
              default:
          }
      }
  };
  var o = false;
  try {
      var d = "item";
      localStorage.setItem(d, d);
      localStorage.removeItem(d);
      o = true
  } catch (b) {}
  var f = false;
  try {
      var p = JSON.parse(JSON.stringify({
          item: "item"
      }));
      if (p.item == "item") {
          f = true
      }
  } catch (b) {}
  /*
  if (document.cookie.indexOf("read=true") != -1) {
      document.getElementById("gdpr").style.display = "none"
  }
  document.getElementById("gdpr-btn").onclick = function() {
      document.getElementById("gdpr").style.display = "none";
      document.cookie = "read=true"
  };
  */
  var g = null;
  var n = {
      undo: [],
      redo: [],
      layout: null,
      fontSize: 20
  };
  var s = "korean";
  g = new a.keyboard("keyboard", "hangul-editor");
  var r = g.textbox;
  r.focus();
  if (o && f) {
      var p = JSON.parse(localStorage.getItem(s));
      if (p != null) {
          if (p.layout) {
              n.layout = p.layout
          }
          if (p.undo) {
              n.undo = p.undo
          }
          if (p.redo) {
              n.redo = p.redo
          }
          if (p.fontSize) {
              n.fontSize = p.fontSize
          }
      }
  }
  if (n.fontSize) {
      g.setFontSize(n.fontSize)
  }
  var l = [{
      Id: "Korean",
      Name: "Korean",
      Json: {
          name: "Korean",
          dir: "ltr",
          keys: [{
              i: "k0",
              c: "0",
              n: "`",
              s: "~",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k1",
              c: "0",
              n: "1",
              s: "!",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k2",
              c: "0",
              n: "2",
              s: "@",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k3",
              c: "0",
              n: "3",
              s: "#",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k4",
              c: "0",
              n: "4",
              s: "$",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k5",
              c: "0",
              n: "5",
              s: "%",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k6",
              c: "0",
              n: "6",
              s: "^",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k7",
              c: "0",
              n: "7",
              s: "&",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k8",
              c: "0",
              n: "8",
              s: "*",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k9",
              c: "0",
              n: "9",
              s: "(",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k10",
              c: "0",
              n: "0",
              s: ")",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k11",
              c: "0",
              n: "-",
              s: "_",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k12",
              c: "0",
              n: "=",
              s: "+",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k13",
              c: "1",
              n: "ㅂ",
              s: "ㅃ",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k14",
              c: "1",
              n: "ㅈ",
              s: "ㅉ",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k15",
              c: "1",
              n: "ㄷ",
              s: "ㄸ",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k16",
              c: "1",
              n: "ㄱ",
              s: "ㄲ",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k17",
              c: "1",
              n: "ㅅ",
              s: "ㅆ",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k18",
              c: "1",
              n: "ㅛ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k19",
              c: "1",
              n: "ㅕ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k20",
              c: "1",
              n: "ㅑ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k21",
              c: "1",
              n: "ㅐ",
              s: "ㅒ",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k22",
              c: "1",
              n: "ㅔ",
              s: "ㅖ",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k23",
              c: "0",
              n: "[",
              s: "{",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k24",
              c: "0",
              n: "]",
              s: "}",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k25",
              c: "0",
              n: "\\",
              s: "|",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k26",
              c: "1",
              n: "ㅁ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k27",
              c: "1",
              n: "ㄴ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k28",
              c: "1",
              n: "ㅇ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k29",
              c: "1",
              n: "ㄹ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k30",
              c: "1",
              n: "ㅎ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k31",
              c: "1",
              n: "ㅗ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k32",
              c: "1",
              n: "ㅓ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k33",
              c: "1",
              n: "ㅏ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k34",
              c: "1",
              n: "ㅣ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k35",
              c: "0",
              n: ";",
              s: ":",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k36",
              c: "0",
              n: "'",
              s: '"',
              l: "",
              t: "",
              f: ""
          }, {
              i: "k37",
              c: "1",
              n: "ㅋ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k38",
              c: "1",
              n: "ㅌ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k39",
              c: "1",
              n: "ㅊ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k40",
              c: "1",
              n: "ㅍ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k41",
              c: "1",
              n: "ㅠ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k42",
              c: "1",
              n: "ㅜ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k43",
              c: "1",
              n: "ㅡ",
              s: "",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k44",
              c: "0",
              n: ",",
              s: "<",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k45",
              c: "0",
              n: ".",
              s: ">",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k46",
              c: "0",
              n: "/",
              s: "?",
              l: "",
              t: "",
              f: ""
          }, {
              i: "k47",
              c: "0",
              n: "\\",
              s: "|",
              l: "",
              t: "",
              f: ""
          }],
          deadkeys: []
      }
  }];
  if (l.length == 1) {
      g.loadVirtualLayout(l[0].Json)
  } else {
      var j = [];
      var m = [];
      if (!n.layout) {
          n.layout = l[0].Id
      }
      for (var c = 0; c < l.length; c++) {
          j.push("<label", (c > 0 ? ' style="margin-left:2em"' : ""), '><input id="', l[c].Id, '" name=type type=radio', (n.layout == l[c].Id ? ' checked="checked"' : ""), "> ", l[c].Name, "</label>");
          m[c] = new a.layout();
          m[c].load(l[c].Json);
          if (n.layout == l[c].Id) {
              g.loadVirtualLayout(l[c].Json)
          }
      }
      var k = document.createElement("p");
      k.innerHTML = j.join("");
      document.getElementById("keyboard").appendChild(k);
      for (var c = 0; c < l.length; c++) {
          var q = function(e, i) {
              document.getElementById(e).onclick = function() {
                  if (n.layout != e) {
                      g.currentLayout = i;
                      g.reset();
                      g.drawKeyboard();
                      n.layout = e;
                      if (o && f) {
                          localStorage.setItem(s, JSON.stringify(n))
                      }
                  }
                  g.textbox.focus()
              }
          }(l[c].Id, m[c])
      }
  }
  g.customOnKey = function(i) {
      a.util.insertAtCaret(this.textbox, i);
      var e = a.util.deleteAtCaret(this.textbox, 2, 0);
      a.util.insertAtCaret(this.textbox, h.composeHangul(e));
      return true
  };
  g.customOnBackspace = function(e) {
      e = h.decomposeHangul(e);
      if (e.length > 1) {
          a.util.insertAtCaret(this.textbox, h.composeHangul(e.slice(0, -1)))
      }
  };
  a.util.indexOf = function(e, v) {
      var u = e.length;
      for (var t = 0; t < u; t++) {
          if (e[t] == v) {
              return t
          }
      }
      return -1
  };
  var h = {
      initial: [12593, 12594, 12596, 12599, 12600, 12601, 12609, 12610, 12611, 12613, 12614, 12615, 12616, 12617, 12618, 12619, 12620, 12621, 12622],
      finale: [0, 12593, 12594, 12595, 12596, 12597, 12598, 12599, 12601, 12602, 12603, 12604, 12605, 12606, 12607, 12608, 12609, 12610, 12612, 12613, 12614, 12615, 12616, 12618, 12619, 12620, 12621, 12622],
      dMedial: [0, 0, 0, 0, 0, 0, 0, 0, 0, 800, 801, 820, 0, 0, 1304, 1305, 1320, 0, 0, 1820],
      dFinale: [0, 0, 0, 119, 0, 422, 427, 0, 0, 801, 816, 817, 819, 825, 826, 827, 0, 0, 1719, 0, 1919],
      SBase: 44032,
      LBase: 4352,
      VBase: 12623,
      TBase: 4519,
      LCount: 19,
      VCount: 21,
      TCount: 28,
      NCount: 588,
      SCount: 11172,
      composeHangul: function(B) {
          var x = B.length;
          if (x == 0) {
              return ""
          }
          var w = B.charCodeAt(0);
          var z = String.fromCharCode(w);
          var e, y, D, u, C, t, A;
          for (var v = 1; v < x; ++v) {
              e = B.charCodeAt(v);
              y = a.util.indexOf(this.initial, w);
              if (y != -1) {
                  D = e - this.VBase;
                  if (0 <= D && D < this.VCount) {
                      w = this.SBase + (y * this.VCount + D) * this.TCount;
                      z = z.slice(0, z.length - 1) + String.fromCharCode(w);
                      continue
                  }
              }
              A = w - this.SBase;
              if (0 <= A && A < 11145 && (A % this.TCount) == 0) {
                  C = a.util.indexOf(this.finale, e);
                  if (C != -1) {
                      w += C;
                      z = z.slice(0, z.length - 1) + String.fromCharCode(w);
                      continue
                  }
                  D = (A % this.NCount) / this.TCount;
                  u = a.util.indexOf(this.dMedial, (D * 100) + (e - this.VBase));
                  if (u > 0) {
                      w += (u - D) * this.TCount;
                      z = z.slice(0, z.length - 1) + String.fromCharCode(w);
                      continue
                  }
              }
              if (0 <= A && A < 11172 && (A % this.TCount) != 0) {
                  C = A % this.TCount;
                  D = e - this.VBase;
                  if (0 <= D && D < this.VCount) {
                      y = a.util.indexOf(this.initial, this.finale[C]);
                      if (0 <= y && y < this.LCount) {
                          z = z.slice(0, z.length - 1) + String.fromCharCode(w - C);
                          w = this.SBase + (y * this.VCount + D) * this.TCount;
                          z = z + String.fromCharCode(w);
                          continue
                      }
                      if (C < this.dFinale.length && this.dFinale[C] != 0) {
                          z = z.slice(0, z.length - 1) + String.fromCharCode(w - C + Math.floor(this.dFinale[C] / 100));
                          w = this.SBase + (a.util.indexOf(this.initial, this.finale[(this.dFinale[C] % 100)]) * this.VCount + D) * this.TCount;
                          z = z + String.fromCharCode(w);
                          continue
                      }
                  }
                  t = a.util.indexOf(this.dFinale, (C * 100) + a.util.indexOf(this.finale, e));
                  if (t > 0) {
                      w = w + t - C;
                      z = z.slice(0, z.length - 1) + String.fromCharCode(w);
                      continue
                  }
              }
              w = e;
              z = z + String.fromCharCode(e)
          }
          return z
      },
      decomposeHangul: function(y) {
          var v = y.length;
          var w = "";
          var e, x, u, A, z;
          for (var t = 0; t < v; t++) {
              var e = y.charCodeAt(t);
              x = e - this.SBase;
              if (x < 0 || x >= this.SCount) {
                  w = w + String.fromCharCode(e);
                  continue
              }
              u = this.initial[Math.floor(x / this.NCount)];
              A = this.VBase + (x % this.NCount) / this.TCount;
              z = this.finale[x % this.TCount];
              w = w + String.fromCharCode(u, A);
              if (z != 0) {
                  w = w + String.fromCharCode(z)
              }
          }
          return w
      }
  };
  if (n.fontSize == null) {
      n.fontSize = g.getFontSize();
      if (o && f) {
          localStorage.setItem(s, JSON.stringify(n))
      }
  }
  /*
  document.getElementById("shrink").onclick = function() {
      if (n.fontSize < 14) {
          return
      }
      n.fontSize -= 2;
      g.setFontSize(n.fontSize);
      g.drawKeyboard();
      if (o && f) {
          localStorage.setItem(s, JSON.stringify(n))
      }
      r.focus()
  };
  document.getElementById("enlarge").onclick = function() {
      if (n.fontSize > 36) {
          return
      }
      n.fontSize += 2;
      g.setFontSize(n.fontSize);
      g.drawKeyboard();
      if (o && f) {
          localStorage.setItem(s, JSON.stringify(n))
      }
      r.focus()
  };
  document.getElementById("email").onclick = function() {
      this.href = "mailto: ?body=" + r.value;
      r.focus();
      return true
  };
  document.getElementById("selectAll").onclick = function() {
      a.util.setCaretPosition(r, 0, r.value.length);
      ga("send", "event", "Keyboard", "click", "Select");
      r.focus()
  };
  document.getElementById("copy").onclick = function() {
      a.util.setCaretPosition(r, 0, r.value.length);
      var e = document.execCommand("copy");
      if (e) {
          a.util.setCaretPosition(r, r.value.length, r.value.length);
          ga("send", "event", "Keyboard", "click", "Copy")
      } else {
          alert("Your browser does not allow automated copy. To copy the text in the text area, you can click Select All button and right click on the selected text. Then click the Copy option.");
          ga("send", "event", "Keyboard", "click", "Copy Fail")
      }
      r.focus()
  };
  if (o && f) {
      if (n.undo.length > 0) {
          r.value = n.undo.pop()
      }
      document.getElementById("clearAll").onclick = function() {
          if (r.value.length < 10 || confirm("Are you sure you want to clear all the text?")) {
              ga("send", "event", "Keyboard", "click", "Clear");
              n.undo = [];
              n.redo = [];
              localStorage.setItem(s, JSON.stringify(n));
              r.value = ""
          }
          r.focus()
      };
      document.getElementById("undo").onclick = function() {
          if (n.undo.length == 0) {
              return
          }
          var e = n.undo.pop();
          if (e != r.value) {
              n.redo.push(r.value);
              r.value = e
          } else {
              r.value = (n.undo.length == 0 ? "" : n.undo[n.undo.length - 1]);
              n.redo.push(e)
          }
          localStorage.setItem(s, JSON.stringify(n));
          r.focus()
      };
      document.getElementById("redo").onclick = function() {
          if (n.redo.length == 0) {
              return
          }
          var e = n.redo.pop();
          r.value = e;
          n.undo.push(e);
          localStorage.setItem(s, JSON.stringify(n));
          r.focus()
      };
      setInterval(function() {
          var e = r.value;
          if (n.undo.length == 0 && e.length == 0) {
              return
          }
          if (n.undo.length == 0 || e != n.undo[n.undo.length - 1]) {
              n.undo.push(e);
              localStorage.setItem(s, JSON.stringify(n))
          }
      }, 3000)
  } else {
      document.getElementById("undo").style.display = "none";
      document.getElementById("redo").style.display = "none";
      document.getElementById("clearAll").style.display = "none"
  }
  document.getElementById("postToTwitter").onclick = function() {
      ga("send", "event", "Keyboard", "click", "Twitter");
      document.getElementById("postToTwitter").href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(r.value);
      r.focus();
      return true
  };
  document.getElementById("searchGoogle").onclick = function() {
      ga("send", "event", "Keyboard", "click", "Google");
      document.getElementById("searchGoogle").href = "https://www.google.com/search?ie=UTF-8&q=" + encodeURIComponent(r.value);
      r.focus();
      return true
  };
  document.getElementById("translateGoogle").onclick = function() {
      ga("send", "event", "Keyboard", "click", "Translate");
      document.getElementById("translateGoogle").href = "https://translate.google.com/#view=home&op=translate&sl=ko&tl=en&text=" + encodeURIComponent(r.value);
      r.focus();
      return true
  };
  document.getElementById("saveAsTextFile").onsubmit = function() {
      ga("send", "Keyboard", "Save", "send", (r.value.length > 0 ? "valid" : "invalid"));
      document.getElementById("data").value = r.value;
      r.focus();
      return true
  }
  */
};