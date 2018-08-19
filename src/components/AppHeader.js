import React, { Component } from "react";
class AppHeader extends Component {
	constructor(props) {
		super(props);
		this.keyDownHandler = this.keyDownHandler.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
	}
	componentDidMount() {
		this.controlPanel = document.querySelector(".control-panel");
		this.body = document.querySelector("body");
		this.menuBtn = document.querySelector("#menu-btn");
	}
	keyDownHandler(e) {
		if (e.keyCode === 13) {
			this.toggleMenu();
		} else if (e.keyCode === 27) {
			if (this.controlPanel.classList.contains("controlPanel-is-open")) {
				this.closeMenu();
			}
		}
	}
	openMenu() {
		this.controlPanel.classList.add("controlPanel-is-open");
		this.body.className = "open";
		this.menuBtn.className = "fas fa-times";
	}
	closeMenu() {
		this.controlPanel.classList.remove("controlPanel-is-open");
		this.body.className = "";
		this.menuBtn.className = "fas fa-bars";
	}
	toggleMenu() {
		/*若菜单未打开*/
		if (!this.controlPanel.classList.contains("controlPanel-is-open")) {
			this.openMenu();
		} else {
			this.closeMenu();
		}
	}
	render() {
		return (
			<header>
				<i
					id="menu-btn"
					className="fas fa-bars"
					onClick={this.toggleMenu}
					onKeyDown={this.keyDownHandler}
					aria-label="菜单按钮，用于开关控制面板"
					tabIndex="0"
				></i>
				<h1>街区地图</h1>
			</header>
		);
	}
}
export default AppHeader;
