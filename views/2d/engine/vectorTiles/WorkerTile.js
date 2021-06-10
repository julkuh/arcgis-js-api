/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../../core/maybe","../../../../core/promiseUtils","../../tiling/enums","./Placement","./TileParser"],(function(t,e,s,r,i){"use strict";return function(){function n(t,e,i,n){this.status=s.TileStatus.INITIALIZED,this.placementEngine=new r.PlacementEngine,this.tileKey=t,this.refKeys=e,this._workerTileHandler=i,this._styleRepository=n}var a=n.prototype;return a.release=function(){this.tileKey="",this.refKeys=null,this.status=s.TileStatus.INITIALIZED,this._workerTileHandler=null},a.parse=async function(r,i,n){const a=n&&n.signal;if(t.isSome(a)){const t=()=>{a.removeEventListener("abort",t),this.status=s.TileStatus.INVALID};a.addEventListener("abort",t)}let l;try{l=await this._parse(r,n)}catch(u){if(e.isAbortError(u))throw u;return{result:[],transferList:[]}}this.status=s.TileStatus.READY;const o=[];for(const t of l){const e=t.serialize();o.push(e)}return{result:o,transferList:o.length<=i&&o}},a.setObsolete=function(){this.status=s.TileStatus.INVALID},a.getLayers=function(){return this._workerTileHandler.getLayers()},a.getWorkerTileHandler=function(){return this._workerTileHandler},a._parse=async function(t,e){const r=t.sourceName2DataAndRefKey;if(0===Object.keys(r).length)return[];this.status=s.TileStatus.MODIFIED;return new i(r,this,e.client,this._styleRepository,t.styleLayerUIDs).parse(e)},n}()}));
