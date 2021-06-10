/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/Handles","../../../../core/watchUtils","../../../input/InputHandler","../../state/controllers/GamepadKeyboardController"],(function(e,a,t,n,r,l){"use strict";let i=function(e){function r(a){var n;return(n=e.call(this,!0)||this).view=a,n.watchHandles=new t,n.handle=n.registerIncoming("gamepad",(e=>n.handleEventGamepad(e))),n.handle.pause(),n}a._inheritsLoose(r,e);var i=r.prototype;return i.onInstall=function(a){e.prototype.onInstall.call(this,a),this.watchHandles.add([n.init(this.view.navigation.gamepad,"enabled",(e=>{e?this.handle.resume():(this.handle.pause(),this.cameraControllerGamepad&&(this.cameraControllerGamepad.finishController(),this.cameraControllerGamepad=null))})),this.view.navigation.gamepad.watch("device",(e=>{this.cameraControllerGamepad&&e&&this.cameraControllerGamepad.gamepadDevice!==e&&(this.cameraControllerGamepad.finishController(),this.cameraControllerGamepad=null)}))])},i.onUninstall=function(){this.watchHandles.removeAll(),e.prototype.onUninstall.call(this)},i.handleEventGamepad=function(e){const a=this.view.navigation.gamepad.device;if(a&&e.data.device!==a)return;const t=this.cameraControllerGamepad&&this.cameraControllerGamepad.active;if(t||l.GamepadKeyboardController.activatesFor(this.view,e.data)){if(!t){const a=new l.GamepadKeyboardController({view:this.view,gamepadDevice:e.data.device});this.view.state.switchCameraController(a)&&(this.cameraControllerGamepad=a)}this.cameraControllerGamepad&&this.cameraControllerGamepad.active&&this.cameraControllerGamepad.gamepadDevice===e.data.device&&this.cameraControllerGamepad.handleEventGamepad(e.data)}},r}(r.InputHandler);e.GamepadNavigation=i,Object.defineProperty(e,"__esModule",{value:!0})}));
