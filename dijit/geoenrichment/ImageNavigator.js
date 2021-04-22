// COPYRIGHT © 2021 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.36/esri/copyright.txt for details.

define(["require","dojo/_base/declare","dojo/on","esri/dijit/geoenrichment/Deferred","esri/dijit/geoenrichment/when","dojo/string","dojo/dom-class","dojo/dom-construct","dijit/_WidgetBase","dijit/_TemplatedMixin","./Pagination","./lists/FlowList","./utils/DeviceUtil","./utils/DnDUtil","./utils/DomUtil","./utils/WaitingUtil","./ReportPlayer/core/annotations/utils/CircularMaskUtil","./ReportPlayer/ReportPlayerState","dojo/text!./templates/ImageNavigator.html","dojo/i18n!../../nls/jsapi"],(function(e,t,i,a,s,n,o,r,h,l,g,m,d,u,c,_,I,f,p,v){v=v.geoenrichment.dijit.ReportPlayer.ImageNavigator;function w(e,t,i){i=i||{},_.showProgress(t);var a=i.loadFullImage&&e.getUrl&&e.getUrl();return s(e.getThumbnail(),(function(n){if(_.removeProgress(t),n){var o=function(a){var s=r.create("div",{class:"imageNode esriGEAbsoluteStretched"},t);return s.style.backgroundImage="url("+a+")",i.useCircularMask?setTimeout((function(){I.setCircularMask(i.useCircularMask,s,a)})):i.scaleToCover&&(s.style.backgroundSize="cover"),"360"===e.imageViewType?r.create("span",{class:"imageNavigator_watermark360"},s):"pano"===e.imageViewType&&r.create("span",{class:"imageNavigator_watermarkPano"},s),s};o(n),a&&s(a).then((function(e){return e&&o(e)}))}else{if(i.pagination)r.create("div",{class:"thumbnailIsUnavailable",innerHTML:v.previewNotAvailable},t);else r.create("div",{class:"imageNode esriGEAbsoluteStretched noImage"},t).style.backgroundImage=""}}))}var b,L=t(null,{createPresentation:function(e,t,i,a){var s=r.create("div",{class:"imageThumbnailListItemRoot"},i);return w(e,s),this.selectPresentation(s,t),s},selectPresentation:function(e,t){o[t?"add":"remove"](e,"imageThumbnailListItemRootSelected")}}),x=t([h,l],{templateString:p,nls:v,showNotes:!0,showThumbnails:!1,showNavigationLabel:!1,enableAllImagesButton:!0,loadFullImages:!1,canShowViewer:!1,pagination:null,thumbnailList:null,allImagesList:null,_firstImageAfterUpdateDfd:null,getRenderPromise:function(){return this._firstImageAfterUpdateDfd&&this._firstImageAfterUpdateDfd.promise},postCreate:function(){this.inherited(arguments),this._initPagination(),this._initThumbnailsList(),this._updateUI(),c.hide(this.noImagePlaceHolder),this._addImageListeners(),this._setViewMode("singleImage"),o[d.isMobileDevice()?"add":"remove"](this.domNode,"mobile")},_initThumbnailsList:function(){this.showThumbnails&&(this.thumbnailList=this._createAllImagesList(this.thumbnailListDiv))},_initAllImagesList:function(){this.allImagesList||(this.allImagesList=this._createAllImagesList(this.allImagesListDiv,"esriGEAbsoluteStretched")),this.allImagesList.setItems(this._images,!0),this.allImagesList.setSelectedIndex(this._imageIndex),this.allImagesList.domNode.style.height=this._height+"px"},_getRendererType:function(){return L},_createAllImagesList:function(e,t){var i=this,a=new m({class:"imageThumbnailList "+(t||""),items:[],itemRenderer:new(this._getRendererType()),noDragTolerance:d.isMobileDevice()?u.MOBILE_TOLERANCE:0,onChange:function(){i._imageIndex=a.items.indexOf(a.selectedItem),i._setViewMode("singleImage"),i._showImage()}}).placeAt(e);return this.own(a),a},_initPagination:function(){var e=this;this.pagination=new g({createItemContainer:function(){var t=r.create("div",{class:"imageNavigator_imagePaginationRoot"});return e._containerHeight>0&&(t.style.height=e._containerHeight+"px"),u.addNoDragClickHandler(t,(function(){e._onImageClicked(t)}),{tolerance:d.isMobileDevice()?u.MOBILE_TOLERANCE:2}),t},updateItemContainer:function(t,i){t.innerHTML="",s(w(i,t,{useCircularMask:e._useCircularMask,scaleToCover:e._scaleToCover,pagination:!0,loadFullImage:e.loadFullImages}),(function(){e._firstImageAfterUpdateDfd&&e._firstImageAfterUpdateDfd.resolve(),e._firstImageAfterUpdateDfd=null}))},scrollAnimation:"slide",autoCenter:"$stretch:1,1"}).placeAt(this.imagePaginationDiv),this.own(this.pagination),this.pagination.set("items",[]),this.pagination.startup()},_onImageClicked:function(t){var i=this,a=this._getCurrentImage();this.canShowViewer&&!d.isMobileDevice()?b?require([b],(function(e){e.showViewer(a,i._images)})):e(["./PanoramicViewer/PanoramicViewer"],(function(e){e.showViewer(a,i._images,{onClose:function(){setTimeout((function(){f.isImageViewerShown=!1}),300)}}),f.isImageViewerShown=!0})):s(a&&a.getUrl&&a.getUrl(),(function(e){e&&window.open(e,"_blank")}))},_updateUI:function(){c[this.showNotes?"show":"hide"](this.imageNoteContainerDiv),c[this.showThumbnails?"show":"hide"](this.thumbnailListDiv),c[this.showNavigationLabel?"show":"hide"](this.navigatorLabel)},_imageIndex:0,_addImageListeners:function(){var e=this;i(this.prevImageButton,"click",(function(){0!=e._imageIndex&&(e._imageIndex--,e._showImage())})),i(this.nextImageButton,"click",(function(){e._imageIndex!=e._images.length-1&&(e._imageIndex++,e._showImage())})),this.enableAllImagesButton&&i(this.showAllImagesButton,"click",(function(){e._setViewMode("allImages")}))},_updateImageButtons:function(){o[this._imageIndex>0?"remove":"add"](this.prevImageButton,"esriGEImageNavigatorPaginationLeftButtonDisabled"),o[this._imageIndex<this._images.length-1?"remove":"add"](this.nextImageButton,"esriGEImageNavigatorPaginationRightButtonDisabled")},_getCurrentImage:function(){return this._images[this._imageIndex]},_showImage:function(){var e=this._getCurrentImage();e?(c.show(this.imageContainerOuter),c.hide(this.noImagePlaceHolder),this.pagination.resize(),this.pagination.set("currentPage",this._imageIndex),this._imageIndex=this.pagination.currentPage,this.thumbnailList&&this.thumbnailList.setSelectedIndex(this._imageIndex)):(c.hide(this.imageContainerOuter),c.show(this.noImagePlaceHolder)),o[e?"remove":"add"](this.domNode,"hasNoImages"),this._updateImageButtons(),this._updateNavigatorLabel(),this._showNote()},_updateNavigatorLabel:function(){this.navigatorLabel.innerHTML=n.substitute(v.paginationLabel,{n:this._imageIndex+1,m:this._images.length})},_showNote:function(){var e=this._getCurrentImage();this.imageNoteLabel.innerHTML=e&&e.description||"",this.imageNoteContainerDiv.style.visibility=this.imageNoteLabel.innerHTML?"visible":"hidden"},_attachmentStore:null,_useCircularMask:null,_scaleToCover:null,update:function(e,t){t=t||{};var i=e&&(!this._attachmentStore||this._attachmentStore._site!==e._site);this._attachmentStore=e||this._attachmentStore,this._updateWithAdditionalParameters(t),this._firstImageAfterUpdateDfd=new a,this._updateUI(),i&&(this._images=[],this._imageIndex=0,this.pagination.set("items",[]),this._showImage());var n=this;return s(this._attachmentStore&&this._attachmentStore.getImages(),(function(e){n._images=e||[],"number"==typeof t.imageIndex&&(n._imageIndex=Math.min(t.imageIndex,n._images.length-1)),n.pagination.set("items",n._images),n._showImage(),n.thumbnailList&&(n.thumbnailList.setItems(n._images),n.thumbnailList.setSelectedIndex(n._imageIndex)),n._height&&n.setHeight(n._height),n._images.length||(n._firstImageAfterUpdateDfd&&n._firstImageAfterUpdateDfd.resolve(),n._firstImageAfterUpdateDfd=null)}))},_updateWithAdditionalParameters:function(e){this._useCircularMask=e.useCircularMask,o[e.alwaysShowCaptions?"add":"remove"](this.domNode,"fixedCaptions"),this._scaleToCover=e.scaleToCover},_mode:null,_setViewMode:function(e){c.hide([this.singleImageView,this.allImagesView]),"singleImage"==e?c.show(this.singleImageView):(c.show(this.allImagesView),this._initAllImagesList()),this._mode=e},isAllImagesShown:function(){return"allImages"===this._mode},getImageIndex:function(){return this._imageIndex},setImageIndex:function(e){this._imageIndex=e,this._showImage()},_height:0,_containerHeight:0,setHeight:function(e){this._height=e,this._containerHeight=e-(this.showThumbnails?50:0),this.imageContainer.style.height=this._containerHeight+"px",this.noImagePlaceHolder.style.paddingTop=(e-169)/2+"px";var t=(this._containerHeight-this.prevImageButton.clientHeight)/2;this.prevImageButton.style.top=t+"px",this.nextImageButton.style.top=t+"px",this.pagination.resize(),this.allImagesList&&(this.allImagesList.domNode.style.height=this._height+"px")}});return x.setViewerPath=function(e){b=e},x}));