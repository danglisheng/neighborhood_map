/*global AMap */
class Utils {
    /* 带有超时的fetch,该函数接收两个参数：
     * 第一个参数为fetch()函数调用后返回的promise，
     * 第二个参数为超时时间。
     * 返回值为fetchPromise和用于定时的abort_promise两者中
     * 最早返回的那个。
     * 参考链接：http://imweb.io/topic/57c6ea35808fd2fb204eef63
     */
    static _fetch(fetchPromise, timeout) {
        let abort_promise = new Promise(function(resolve, reject) {
            setTimeout(reject, timeout, "abort promise");
        });
        let abortable_promise = Promise.race([fetchPromise, abort_promise]);
        return abortable_promise;
    }
    /* 获取服务器上的json格式文件，
     * 该函数接收一个回调函数作为参数，
     * 处理响应成功或失败的情形。
     */
    static fetchData(url, callback) {
        return Utils._fetch(fetch(url), 5000)
            .then(res => res.json())
            .then(
                data => {
                    callback(data, null);
                },
                error => {
                    callback(null, error);
                }
            )
            .catch(error => {
                console.log(error);
            });
    }
    /* 添加加载指示器，传入的参数node为需要添加加载指示的DOM节点*/
    static addLoader(node) {
        var loaderWrapper = document.createElement("div");
        loaderWrapper.className = "loader-wrapper";
        var loader = document.createElement("div");
        loader.className = "loader";
        loaderWrapper.appendChild(loader);
        node.appendChild(loaderWrapper);
        return loaderWrapper;
    }
    static removeLoader(node) {
        var loaderWrapper = document.querySelector(".loader-wrapper");
        loaderWrapper&&node.removeChild(loaderWrapper);
    }
    /* 处理读取的地点对象，返回地点数组。
     * 为地点对象每个属性值（类型为数组）所包含的元素都增加一个
     * 名为type的属性———该属性值为地点对象的属性名。
     */
    static getLocations(locations) {
        var keys = Object.keys(locations);
        const locationArr = [];
        keys.forEach(key => {
            locations[key].forEach(location => {
                location.type = key;
                locationArr.push(location);
            });
        });
        return locationArr;
    }
    /* 此函数用于异步加载地图API*/
    static loadAmapAPI() {
        var url =
            "https://webapi.amap.com/maps?v=1.4.6&key=bc761df960968be4a924db1a2d61b4eb&callback=initMap";
        var jsapi = document.createElement("script");
        jsapi.charset = "utf-8";
        jsapi.async = true;
        jsapi.src = url;
        jsapi.onerror = function(error) {
            console.log("File loaded error", error);
            const mapContainer = document.getElementById("map");
            mapContainer.innerHTML = "地图加载失败,请刷新浏览器重试";
        };
        document.body.appendChild(jsapi);
    }
    /* 此函数用于为单个位置添加标记 */
    static addMarkerForLocation(location) {
        const marker = new AMap.Marker({
            map: window.map,
            position: location.position
        });
        marker.id = location.id;
        marker.name = location.name;
        marker.type = location.type;
        return marker;
    }
    /* 该函数用于初始化所有标记 */
    static initAllMarkers(locations) {
        const markersArr = [];
        locations.forEach(location => {
            markersArr.push(Utils.addMarkerForLocation(location));
        });
        /* 当所有标记都被添加到地图后，再为它们一一绑定事件*/
        markersArr.forEach(marker => {
            AMap.event.addListener(marker, "click", function() {
                /* 点击标记时，打开信息窗体*/
                Utils.populateInfoWindow(marker);
                /* 未被点击的所有标记都取消动画 */
                markersArr.forEach(mk => {
                    if (mk.id !== marker.id) {
                        mk.setAnimation("AMAP_ANIMATION_NONE");
                    }
                });

                var highlight = document.querySelector(".location-focus");
                var relatedLoc = document.getElementById(marker.id);
                /* 如果存在高亮的地点项 */
                if (highlight) {
                    /* 如果点击标记不对应高亮地点项，取消该高亮，
                     * 并为点击标记对应的地点项增加高亮。
                     */
                    if (highlight.id !== marker.id.toString()) {
                        highlight.classList.remove("location-focus");
                        relatedLoc.classList.add("location-focus");
                    }
                } else {
                /* 若不存在高亮地点项，则为点击标记所对应的地点项添加高亮。*/
                    relatedLoc.classList.add("location-focus");
                }
            });
        });
        /* 返回包含所有标记的数组 */
        return markersArr;
    }
    /* 与列表中被点击的地点项相对应标记的动画效果*/
    static markerAniForClickedLoc(marker, locationNode) {
        /* 若列表中被点击的地点项处于高亮状态，则取消对应标记的动画效果*/
        if (locationNode.classList.contains("location-focus")) {
            marker.setAnimation("AMAP_ANIMATION_NONE");
        } else {
        /* 若被点击的地点项非高亮，则为对应标记添加弹跳动画*/
            marker.setAnimation("AMAP_ANIMATION_BOUNCE");
        }
    }
    /* 该函数用于通过下拉菜单来过滤标记，传入两个参数：
     * 要过滤的标记数组markers和地点类型locationType  
     */
    static filterMarkersBySelect(markers, locationType) {
        markers.forEach(marker => {
            marker.setAnimation("AMAP_ANIMATION_NONE"); //取消所有标记动画
            /* 如果标记的类型和所选地点项类型相同，则显示，否则隐藏*/
            if (marker.type !== locationType) {
                marker.hide();
            } else {
                marker.show();
            }
        });
    }
    /* 该函数用于通过关键字来过滤标记，传入两个参数：
     * 要过滤的标记数组markers和用于显示的地点数组displayedLocations
     */
    static filterMarkersByKeyword(markers, displayedLocations) {
        markers.forEach(marker => {
            marker.hide();
            displayedLocations.forEach(location => {
                if (location.id === marker.id) {
                    marker.show();
                }
            });
        });
    }
    /* 该函数用于显示所有标记，需传入一个参数：
     * 要显示的标记数组。
     */
    static showAllMarkers(markers) {
        markers.forEach(marker => {
            marker.show();
        });
    }
    /* 该函数用于填充信息窗体 
     * 它接收两个参数：标记marker和代表列表中被点击地点项的DOM节点
     * 第二个参数为可选参数。
     */
    static populateInfoWindow(marker, locationNode) {
        if (window.infoWindow.marker !== marker) {
            window.infoWindow.marker = marker;
            var info = Utils.createInfoWindow(
                marker.name,
                Utils.createInfoWinContent(marker)
            );
            window.infoWindow.setContent(info);
            window.infoWindow.setPosition(marker.getPosition());

            var focusedElementBeforeInfo = document.activeElement;
            window.infoWindow.open(window.map, marker.getPosition());
            var infoDOMNode = document.querySelector(".info");
            infoDOMNode.addEventListener("keydown", function(e) {
                /* 如果按下的是tab键，则把焦点锁定在关闭按钮 */
                if (e.keyCode === 9) {
                    e.preventDefault();
                    var closeBtn = document.querySelector(".info-top img");
                    closeBtn.focus();
                } else if (e.keyCode === 27) {
                /* 如果按下的是esc键，则关闭信息窗体*/
                    Utils.closeInfoWindow();
                }
            });
            infoDOMNode.setAttribute("tabindex", "0");
            infoDOMNode.focus();
            infoDOMNode.setAttribute(
                "aria-label",
                "这是用于显示关于标记的额外信息的信息窗体"
            );
            /* 为信息窗体绑定关闭事件 */
            var closeHandler = AMap.event.addListener(
                window.infoWindow,
                "close",
                function() {
                    marker.setAnimation("AMAP_ANIMATION_NONE"); //取消标记动画
                    window.infoWindow.marker = null;
                    AMap.event.removeListener(closeHandler);
                    focusedElementBeforeInfo.focus();
                }
            );
        } else {
            /* 若点击地点项而调用的此函数，则关闭窗口。
         * 若点击标记调用的此函数，则什么都不做。
        */
            if (locationNode) {
                window.infoWindow.close();
            }
        }
    }
    /* 创建信息窗体的内容 */
    static createInfoWinContent(marker) {
        var url =
            "https://zh.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=extracts|pageimages&exintro=true&exsentences=2&explaintext=true&piprop=original&origin=*&titles=";
        var requrl = url + marker.name;
        var content =
            "<div><p>" +
            marker.name +
            '</p><figure class="scenic-photo-wrapper"><img id=\'scenicPhoto\' alt="' +
            marker.name +
            "\"/></figure><p id='extract'></p></div>";
        Utils.fetchData(requrl, function(data, error) {
            Utils.removeLoader(document.querySelector(".info-middle"));
            if (data) {
                var page =
                    data.query && data.query.pages && data.query.pages[0];
                var extract = page && page.extract;
                var imgUrl = page && page.original && page.original.source;
                if (extract) {
                    document.getElementById("extract").innerHTML = extract;
                } else {
                    document.getElementById("extract").innerHTML =
                        "抱歉，中文维基百科没有关于" + marker.name + "的词条";
                    document.querySelector(
                        ".scenic-photo-wrapper"
                    ).style.display =
                        "none";
                }

                if (imgUrl) {
                    document
                        .getElementById("scenicPhoto")
                        .setAttribute("src", imgUrl);
                } else {
                    document
                        .getElementById("scenicPhoto")
                        .setAttribute("src", "./img/nopic.png");
                    document
                        .getElementById("scenicPhoto")
                        .setAttribute(
                            "alt",
                            "用于指示找不到相关照片的占位图片"
                        );
                }
            }
            if (error) {
                console.log("error: ", error);
                document.querySelector(".scenic-photo-wrapper").style.display =
                    "none";
                document.getElementById("extract").innerHTML =
                    "亲，您需要科学上网，才能查看从中文维基百科获取的信息。";
            }
        });

        return content;
    }
    static createInfoWindow(title, content) {
        var info = document.createElement("div");
        info.className = "info";
        info.style.backgroundColor = "white";
        /* 信息窗口上部 */
        var infoTop = document.createElement("div");
        var infoTitle = document.createElement("div");
        var closeButton = document.createElement("img");
        infoTop.className = "info-top";
        infoTitle.innerHTML = title;
        closeButton.src = "./img/closeBtn.gif";
        closeButton.setAttribute("tabindex", "0");
        closeButton.setAttribute("aria-label", "信息窗体关闭按钮");
        closeButton.addEventListener("click", Utils.closeInfoWindow);
        closeButton.addEventListener("keydown", function(e) {
            if (e.keyCode === 13) {
                Utils.closeInfoWindow();
            }
        });
        infoTop.appendChild(infoTitle);
        infoTop.appendChild(closeButton);
        info.appendChild(infoTop);

        var infoMiddle = document.createElement("div");
        infoMiddle.className = "info-middle";
        infoMiddle.innerHTML =
            content + '<span class="info-footer">此信息来自中文维基百科</span>';
        info.appendChild(infoMiddle);
        /* 添加加载显示器 */
        Utils.addLoader(infoMiddle);

        var infoBottom = document.createElement("div");
        var sharp = document.createElement("img");
        infoBottom.className = "info-bottom";
        sharp.src = "./img/sharp.png";

        infoBottom.appendChild(sharp);
        info.appendChild(infoBottom);

        return info;
    }
    /* 信息窗体关闭按钮的click事件处理程序 */
    static closeInfoWindow() {
        window.infoWindow.close();
        if (document.querySelector(".location-focus")) {
            document
                .querySelector(".location-focus")
                .classList.remove("location-focus");
        }
    }
    /* 当改变窗口宽度时，重置菜单状态。此函数是为了防止在PC端小窗口下打开菜单，然后把窗口拉大后，同时应用小窗口下菜单打开时的样式和大窗口下的样式，而使页面错乱*/
    static resetMenuWhileResizeWin() {
        const body = document.querySelector("body");
        let lastWinWidth = window.innerWidth;
        window.addEventListener("resize", function() {
            let curWinWidth = window.innerWidth;
            if (curWinWidth !== lastWinWidth) {
                if (body.classList.contains("open")) {
                    var menuBtn = document.querySelector("#menu-btn");
                    var controlPanel = document.querySelector(".control-panel");
                    body.classList.remove("open");
                    menuBtn.className = "fas fa-bars";
                    controlPanel.classList.remove("controlPanel-is-open");
                }
                lastWinWidth = curWinWidth;
            }
        });
    }
}
export default Utils;
