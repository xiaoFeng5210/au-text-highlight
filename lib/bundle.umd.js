(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react/jsx-runtime'), require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react/jsx-runtime', 'react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.AuTextHighlight = {}, global.jsxRuntime, global.React));
})(this, (function (exports, jsxRuntime, react) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var sectionRange = (function (container, positions) {
      // Selection 对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。通常由用户拖拽鼠标经过文字而产生
      var selection = document === null || document === void 0 ? void 0 : document.getSelection();
      if (!selection) {
        throw new Error('No selection found');
      }
      selection.removeAllRanges();
      positions.forEach(function (_a) {
        var start = _a.start,
          end = _a.end,
          _b = _a.gid,
          gid = _b === void 0 ? '' : _b;
        var _c = getNodeAndOffset(container, start, end),
          startNode = _c[0],
          startOffset = _c[1],
          endNode = _c[2],
          endOffset = _c[3];
        var range = document.createRange();
        range.setStart(startNode, startOffset);
        range.setEnd(endNode, endOffset);
        // selection.addRange(range)
        var eleWrap = document.createElement('span');
        eleWrap.setAttribute('role', 'text');
        eleWrap.setAttribute('aria-label', '高亮内容');
        eleWrap.className = 'word_comment_mark';
        if (gid) {
          eleWrap.setAttribute('id', gid);
        }
        try {
          range.surroundContents(eleWrap);
        } catch (_d) {
          console.error('存在不可高亮的元素，多半由于选区交叉导致');
        }
      });
    });
    /**
     * 通过dom，开始节点和结束节点，来完成高亮功能
     * @param dom
     * @param start
     * @param end
     */
    function getNodeAndOffset(dom, start, end) {
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = 0;
      }
      var arrTextList = [];
      // 把只要是文本节点的，都放到arrTextList中
      var map = function (child) {
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        __spreadArray([], child, true).forEach(function (el) {
          if (el.nodeName === '#text') {
            arrTextList.push(el);
          } else if (el.textContent) {
            map(el.childNodes);
          }
        });
      };
      map(dom.childNodes);
      var startNode = null;
      var startIndex = 0;
      var endNode = null;
      var endIndex = 0;
      // 总的字符长度
      var total = startIndex;
      // 计算长度
      arrTextList.forEach(function (node) {
        if (startNode && endNode) {
          return;
        }
        var length = node.textContent.length;
        // 当前节点，总的长度范围
        var range = [total, total + length];
        // 看看，start和end有没有在其中
        // start在这个范围中
        // 可以确定startIndex了
        if (!startNode && start >= range[0] && start < range[1]) {
          startNode = node;
          startIndex = start - range[0];
        }
        // '我要' (0, 2)
        if (!endNode && end > range[0] && end <= range[1]) {
          endNode = node;
          endIndex = end - range[0];
        }
        total = total + length;
      });
      if (!startNode || !endNode) {
        return null;
      }
      return [startNode, startIndex, endNode, endIndex];
    }

    var startIndex = 0;
    /**
     * 获取选区内容
     * @returns {content: string, section: Selection}
     */
    function getSelectionRangeContent() {
      if (document) {
        var section = document === null || document === void 0 ? void 0 : document.getSelection();
        if (section) {
          return {
            content: section.toString(),
            section: section
          };
        } else {
          throw new Error('selection is undefined');
        }
      } else {
        throw new Error('document is undefined');
      }
    }
    /**
     * 获得当前选区范围
     * @returns [startIndex, endIndex]
     */
    // eslint-disable-next-line unused-imports/no-unused-vars
    function getSelectionRange(container, config) {
      // if (config && 'theme' in config) {
      // }
      startIndex = 0;
      // 给元素设置直接设置样式
      var selection = document.getSelection();
      var range = selection.getRangeAt(0);
      var rangeAtFirstTextNode = range.startContainer;
      var startOffset = range.startOffset; // 开始位置的偏移量
      loopTreeIndex(container, rangeAtFirstTextNode, startOffset);
      var endIndex = startIndex + selection.toString().trim().length;
      return [startIndex, endIndex];
    }
    function loopTreeIndex(dom, rangeAtFirstTextNode, startOffset) {
      var MAX_DEPTH = 1000;
      var textNodeArr = [];
      var firstChildNodes = dom.childNodes;
      var loop = function (childs, depth) {
        if (depth === void 0) {
          depth = 0;
        }
        if (depth > MAX_DEPTH) {
          throw new Error('DOM tree is too deep');
        }
        for (var i = 0; i < childs.length; i++) {
          var node = childs[i];
          if (!node.textContent) {
            continue;
          }
          if (node.nodeName === '#text') {
            textNodeArr.push(node);
          } else {
            loop(node.childNodes, depth + 1);
          }
        }
      };
      loop(firstChildNodes);
      if (textNodeArr.length > 0) {
        textNodeArr.some(function (node) {
          if (node.textContent === rangeAtFirstTextNode.textContent) {
            startIndex += startOffset;
            return true;
          }
          if (node.textContent) {
            startIndex += node.textContent.length;
          }
          return false;
        });
      }
    }

    /**
     * 构建正则
     * @param keywords
     */
    function createRegexFromKeywords(keywords) {
      var escapeRegExp = function (str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& 表示整个匹配的字符串
      };
      if (typeof keywords === 'string') {
        return new RegExp("".concat(escapeRegExp(keywords)), 'gi');
      }
      if (Array.isArray(keywords)) {
        var escapedKeywords = keywords.map(escapeRegExp);
        // 将所有关键字用 | 分隔，并加入 \b 以确保匹配整个单词，关键字先进行转义
        return new RegExp("(".concat(escapedKeywords.join('|'), ")"), 'gi');
      }
    }
    /**
     * 匹配关键词并返回位置
     * @param str
     * @param keywords
     */
    function matchKeywordsWithPositions(str, keywords) {
      var regex = createRegexFromKeywords(keywords);
      var matches = [];
      var match;
      // 使用 exec 遍历所有匹配项
      /**
       * {
      0: "apple",          // 完整匹配的文本
      index: 7,            // 匹配开始的字符索引
      input: "I like apple", // 原始输入字符串
      groups: undefined,    // 命名捕获组（本例未使用）
      length: 1            // 捕获组数量
      }
       */
      // eslint-disable-next-line no-cond-assign
      while ((match = regex.exec(str)) !== null) {
        matches.push({
          keyword: match[0],
          start: match.index,
          end: match.index + match[0].length
        });
      }
      return matches;
    }
    /**
     * 核心方法
     * @param config
     */
    function auExtractHighlightText(config) {
      var text = config.text,
        keywords = config.keywords;
      return matchKeywordsWithPositions(text, keywords);
    }

    /**
     * 划词选区后，popover组件
     */
    var Popover = /** @class */function () {
      function Popover(popoverId, config) {
        if (config === void 0) {
          config = {};
        }
        var _a;
        this.popoverEle = null;
        this.distance = 5;
        this.distance = (_a = config === null || config === void 0 ? void 0 : config.distance) !== null && _a !== void 0 ? _a : this.distance;
        this.init(popoverId);
        this.initEvent();
      }
      Popover.prototype.init = function (popoverId) {
        var $ele = document.getElementById(popoverId);
        if (!$ele) {
          throw new Error('popoverId is not found');
        }
        this.popoverEle = $ele;
        this.popoverEle.style.visibility = 'hidden';
        this.popoverEle.style.display = 'none';
        this.popoverEle.style.position = 'fixed';
        document.body.appendChild(this.popoverEle);
      };
      Popover.prototype.initEvent = function () {
        var _this = this;
        document.addEventListener('mouseup', function () {
          setTimeout(function () {
            var triggerPosition = _this.getTriggerPosition();
            if (triggerPosition) {
              _this.show(triggerPosition);
            } else {
              _this.hide();
            }
          }, 100);
        });
      };
      Popover.prototype.show = function (position) {
        var _a = position.x,
          x = _a === void 0 ? 0 : _a,
          _b = position.y,
          y = _b === void 0 ? 0 : _b,
          _c = position.width,
          width = _c === void 0 ? 0 : _c;
        if (!this.popoverEle) return;
        // 计算触发元素的中心点
        var centerX = x + width / 2;
        var actualLeft = centerX - this.popoverEle.offsetWidth / 2;
        var actualTop = y - this.popoverEle.offsetHeight - this.distance;
        // 如果是两行的情况, 在最右侧
        if (position.height > 30) {
          actualLeft = x + width - this.popoverEle.offsetWidth;
        }
        this.popoverEle.style.left = "".concat(actualLeft, "px");
        this.popoverEle.style.top = "".concat(actualTop, "px");
        this.popoverEle.style.display = 'block';
        this.popoverEle.style.visibility = 'visible';
      };
      Popover.prototype.hide = function () {
        if (!this.popoverEle) return;
        this.popoverEle.style.display = 'none';
        this.popoverEle.style.visibility = 'hidden';
      };
      Popover.prototype.getTriggerPosition = function () {
        var _a;
        var selection = document.getSelection();
        if (selection) {
          var result = (_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.toString();
          if (result) {
            // 代表用户是刚结束划词，需要展示popover
            var range = selection.getRangeAt(0);
            var rect = range.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) return null;
            return {
              text: result,
              x: rect.left + window.scrollX,
              y: rect.top + window.scrollY,
              width: rect.width,
              height: rect.height
            };
          } else {
            return null;
          }
        } else {
          console.error('no selection');
        }
      };
      return Popover;
    }();
    /**
     * @param popoverId 用户需要展示弹窗元素的id
     */
    var DrawWordConstituencyPopover = /** @class */function (_super) {
      __extends(DrawWordConstituencyPopover, _super);
      function DrawWordConstituencyPopover(popoverId, config) {
        if (config === void 0) {
          config = {};
        }
        return _super.call(this, popoverId, config) || this;
      }
      return DrawWordConstituencyPopover;
    }(Popover);

    /**
     * 简单的节流函数实现
     * 在指定时间间隔内最多执行一次函数
     *
     * @param func 要节流的函数
     * @param wait 等待时间（毫秒）
     * @returns 节流后的函数
     */
    function throttle(func, wait) {
      var timeoutId = null;
      var lastExecTime = 0;
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var currentTime = Date.now();
        // 如果是第一次调用或者距离上次执行超过wait时间，立即执行
        if (currentTime - lastExecTime > wait) {
          lastExecTime = currentTime;
          return func.apply(void 0, args);
        }
        // 如果还在等待期内，清除之前的定时器，设置新的定时器
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = window.setTimeout(function () {
          lastExecTime = Date.now();
          func.apply(void 0, args);
          timeoutId = null;
        }, wait - (currentTime - lastExecTime));
      };
    }

    /**
     * 文本选区检测 Hook
     * 复用现有的选区检测逻辑，提供 React 友好的接口
     */
    function useTextSelection(options) {
      if (options === void 0) {
        options = {};
      }
      var _a = options.delay,
        delay = _a === void 0 ? 100 : _a,
        container = options.container,
        selectionChange = options.selectionChange;
      var _b = react.useState(null),
        selection = _b[0],
        setSelection = _b[1];
      var _c = react.useState(false),
        isSelecting = _c[0],
        setIsSelecting = _c[1];
      var getTriggerPosition = react.useCallback(function () {
        var docSelection = document.getSelection();
        if (!docSelection) {
          return null;
        }
        var result = docSelection.toString();
        if (!result) {
          return null;
        }
        // 如果指定了容器，检查选区是否在容器内
        if (container) {
          try {
            var range = docSelection.getRangeAt(0);
            if (!container.contains(range.startContainer) || !container.contains(range.endContainer)) {
              return null;
            }
          } catch (error) {
            return null;
          }
        }
        try {
          var range = docSelection.getRangeAt(0);
          var rect = range.getBoundingClientRect();
          // 检查是否是有效的选区
          if (rect.width === 0 && rect.height === 0) {
            return null;
          }
          return {
            text: result,
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
          };
        } catch (error) {
          console.error('获取选区位置失败:', error);
          return null;
        }
      }, [container]);
      var clearSelection = react.useCallback(function () {
        setSelection(null);
        setIsSelecting(false);
        selectionChange === null || selectionChange === void 0 ? void 0 : selectionChange(null);
      }, [selectionChange]);
      var handleMouseDown = react.useCallback(function () {
        setIsSelecting(true);
        setSelection(null);
        selectionChange === null || selectionChange === void 0 ? void 0 : selectionChange(null);
      }, [selectionChange]);
      var handleMouseUp = react.useCallback(function () {
        setTimeout(function () {
          var triggerPosition = getTriggerPosition();
          if (triggerPosition) {
            setSelection(triggerPosition);
            selectionChange === null || selectionChange === void 0 ? void 0 : selectionChange(triggerPosition);
          } else {
            setSelection(null);
            selectionChange === null || selectionChange === void 0 ? void 0 : selectionChange(null);
          }
          setIsSelecting(false);
        }, delay);
      }, [getTriggerPosition, delay, selectionChange]);
      var handleSelectionChange = react.useCallback(function () {
        if (!isSelecting) {
          var triggerPosition = getTriggerPosition();
          if (!triggerPosition) {
            setSelection(null);
            selectionChange === null || selectionChange === void 0 ? void 0 : selectionChange(null);
          }
        }
      }, [getTriggerPosition, isSelecting, selectionChange]);
      react.useEffect(function () {
        var targetElement = container || document;
        targetElement.addEventListener('mousedown', handleMouseDown);
        targetElement.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('selectionchange', handleSelectionChange);
        return function () {
          targetElement.removeEventListener('mousedown', handleMouseDown);
          targetElement.removeEventListener('mouseup', handleMouseUp);
          document.removeEventListener('selectionchange', handleSelectionChange);
        };
      }, [container, handleMouseDown, handleMouseUp, handleSelectionChange]);
      return {
        selection: selection,
        isSelecting: isSelecting,
        clearSelection: clearSelection,
        getTriggerPosition: getTriggerPosition
      };
    }

    /**
     * React 版本的文本选区 Popover 组件
     * 支持插槽式内容自定义，复用现有的位置计算逻辑
     */
    var AuSelectionPopover = function (_a) {
      var _b, _c;
      var children = _a.children,
        _d = _a.distance,
        distance = _d === void 0 ? 10 : _d,
        _e = _a.className,
        className = _e === void 0 ? '' : _e,
        _f = _a.style,
        style = _f === void 0 ? {} : _f,
        container = _a.container,
        onShow = _a.onShow,
        onHide = _a.onHide,
        _g = _a.disabled,
        disabled = _g === void 0 ? false : _g,
        _h = _a.zIndex,
        zIndex = _h === void 0 ? 9999 : _h;
      var popoverRef = react.useRef(null);
      var _j = react.useState(false),
        isVisible = _j[0],
        setIsVisible = _j[1];
      var _k = react.useState({}),
        popoverStyle = _k[0],
        setPopoverStyle = _k[1];
      // 计算 Popover 位置
      var calculatePosition = react.useCallback(function (position) {
        if (!popoverRef.current) return {};
        var x = position.x,
          y = position.y,
          width = position.width,
          height = position.height;
        var popoverRect = popoverRef.current.getBoundingClientRect();
        // 计算基本位置
        var centerX = x + width / 2;
        var actualLeft = centerX - popoverRect.width / 2;
        var actualTop = y - popoverRect.height - distance;
        // 边界检测和调整
        var viewportWidth = window.innerWidth;
        var scrollX = window.scrollX;
        var scrollY = window.scrollY;
        // 水平边界检测
        if (actualLeft < scrollX) {
          actualLeft = scrollX + 8; // 8px 边距
        } else if (actualLeft + popoverRect.width > scrollX + viewportWidth) {
          actualLeft = scrollX + viewportWidth - popoverRect.width - 8;
        }
        // 垂直边界检测 - 如果上方空间不足，显示在下方
        if (actualTop < scrollY) {
          actualTop = y + height + distance;
        }
        // 如果是多行选择，调整水平位置到右侧
        if (height > 30) {
          actualLeft = x + width - popoverRect.width;
          // 确保不超出右边界
          if (actualLeft + popoverRect.width > scrollX + viewportWidth) {
            actualLeft = scrollX + viewportWidth - popoverRect.width - 8;
          }
        }
        return {
          position: 'fixed',
          left: "".concat(actualLeft, "px"),
          top: "".concat(actualTop, "px"),
          zIndex: zIndex,
          opacity: 1,
          visibility: 'visible',
          transform: 'translateY(0)',
          transition: 'opacity 0.2s ease, transform 0.2s ease'
        };
      }, [distance, zIndex]);
      var selectionChange = react.useCallback(function (selectionObj) {
        if (disabled) {
          setIsVisible(false);
          return;
        }
        if (selectionObj) {
          var newStyle = calculatePosition(selectionObj);
          setPopoverStyle(newStyle);
          setIsVisible(true);
          onShow === null || onShow === void 0 ? void 0 : onShow(selectionObj);
        } else {
          setIsVisible(false);
          setPopoverStyle(function (prev) {
            return __assign(__assign({}, prev), {
              opacity: 0,
              visibility: 'hidden',
              transform: 'translateY(-4px)'
            });
          });
          onHide === null || onHide === void 0 ? void 0 : onHide();
        }
      }, [disabled, calculatePosition, onShow, onHide]);
      var _l = useTextSelection({
          delay: 100,
          container: container,
          selectionChange: selectionChange
        }),
        selection = _l.selection,
        clearSelection = _l.clearSelection,
        getTriggerPosition = _l.getTriggerPosition;
      // 点击外部区域隐藏
      react.useEffect(function () {
        var handleClickOutside = function (event) {
          if (isVisible && popoverRef.current && !popoverRef.current.contains(event.target)) {
            clearSelection();
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isVisible, clearSelection]);
      // 响应窗口大小变化
      react.useEffect(function () {
        if (!isVisible || !selection) return;
        var handleResize = throttle(function () {
          var selectionInfo = getTriggerPosition();
          if (!selectionInfo) return;
          var newStyle = calculatePosition(selectionInfo);
          setPopoverStyle(newStyle);
        }, 50);
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize);
        return function () {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('scroll', handleResize);
        };
      }, [isVisible, selection, calculatePosition]);
      // const open = () => {
      //   setIsVisible(true)
      //   setPopoverStyle(prev => ({
      //     ...prev,
      //     opacity: 1,
      //     visibility: 'visible' as const,
      //   }))
      // }
      // const close = () => {
      //   setIsVisible(false)
      //   setPopoverStyle(prev => ({
      //     ...prev,
      //     opacity: 0,
      //     visibility: 'hidden' as const,
      //   }))
      // }
      var popoverElement = jsxRuntime.jsx("div", {
        ref: popoverRef,
        className: "au-text-highlight-popover ".concat(className),
        style: __assign(__assign(__assign({}, popoverStyle), style), {
          // 默认样式
          position: popoverStyle.position || 'fixed',
          pointerEvents: isVisible ? 'auto' : 'none',
          userSelect: 'none',
          // 确保在最初渲染时不可见
          opacity: (_b = popoverStyle.opacity) !== null && _b !== void 0 ? _b : 0,
          visibility: (_c = popoverStyle.visibility) !== null && _c !== void 0 ? _c : 'hidden'
        }),
        children: children
      });
      return popoverElement;
    };

    exports.DrawWordConstituencyPopover = DrawWordConstituencyPopover;
    exports.ReactAuSelectionPopover = AuSelectionPopover;
    exports.auExtractText = auExtractHighlightText;
    exports.getSelectionRange = getSelectionRange;
    exports.getSelectionRangeContent = getSelectionRangeContent;
    exports.sectionRangeHighlight = sectionRange;
    exports.useTextSelection = useTextSelection;

}));
