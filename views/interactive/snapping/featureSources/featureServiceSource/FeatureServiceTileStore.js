/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../chunks/tslib.es6","../../../../../core/has","../../../../../core/maybe","../../../../../core/Logger","../../../../../core/accessorSupport/ensureType","../../../../../core/accessorSupport/decorators/property","../../../../../core/accessorSupport/decorators/subclass","../../../../../core/urlUtils","../../../../../core/uuid","../../../../../portal/support/resourceExtension","../../../../../core/Accessor","../../../../../geometry/support/aaBoundingRect","../../../../../layers/graphics/featureConversionUtils","../../../../../rest/query/operations/query","../../../../../core/byteSizeEstimations","../../../../../layers/graphics/data/BoundsStore","./FeatureServiceTileCache"],(function(e,t,i,s,r,o,n,l,c,u,a,h,f,d,p,S,m,y,g){"use strict";e.FeatureServiceTileStore=function(e){function i(t){var i;return(i=e.call(this,t)||this).tileInfo=null,i.extent=null,i.maximumByteSize=10485760,i.tileBounds=new y.BoundsStore,i.tiles=new g.FeatureServiceTileCache,i.refCounts=new Map,i.tileFeatureCounts=new Map,i.tmpBoundingRect=d.create(),i}t._inheritsLoose(i,e);var s=i.prototype;return s.add=function(e,t){const i=[];for(const s of t)0===this.referenceFeature(s.objectId)&&i.push(s);this.addTileStorage(e,new Set(t.map((({objectId:e})=>e))),this.byteSizeOfFeatures(t)),this.featureStore.addMany(i),this.tiles.applyByteSizeLimit(this.maximumByteSize,(e=>this.removeTileStorage(e)))},s.destroy=function(){this.clear(),this.tileFeatureCounts.clear()},s.clear=function(){this.featureStore.clear(),this.tileBounds.clear(),this.tiles.clear(),this.refCounts.clear()},s.refresh=function(){this.clear(),this.tileFeatureCounts.clear()},s.processEdits=function(e,t,i){return this.processEditsDelete(e.deletedFeatures.concat(e.updatedFeatures)),this.processEditsRefetch(e.addedFeatures.concat(e.updatedFeatures),t,i)},s.addTileStorage=function(e,t,i){this.tiles.set(e.id,new v(e,t,i)),this.tileBounds.set(e.id,e.extent),this.tileFeatureCounts.set(e.id,t.size)},s.remove=function({id:e}){const t=this.tiles.get(e);t&&this.removeTileStorage(t)},s.removeTileStorage=function(e){const t=[];for(const s of e.objectIds)1===this.unreferenceFeature(s)&&t.push(s);this.featureStore.removeManyById(t);const i=e.data.id;this.tiles.delete(i),this.tileBounds.delete(i)},s.processEditsDelete=function(e){this.featureStore.removeManyById(e);for(const[,t]of this.tiles){for(const i of e)t.objectIds.delete(i);this.tileFeatureCounts.set(t.data.id,t.objectIds.size)}for(const t of e)this.refCounts.delete(t)},s.processEditsRefetch=async function(e,t,i){const s=(await t(e,i)).features,{hasZ:r,hasM:o}=this.featureStore;for(const n of s){const e=p.getBoundsOptimizedGeometry(this.tmpBoundingRect,n.geometry,r,o);this.tileBounds.forEachInBounds(e,(e=>{const t=this.tiles.get(e);this.featureStore.add(n),t.objectIds.has(n.objectId)||(t.objectIds.add(n.objectId),this.referenceFeature(n.objectId),this.tileFeatureCounts.set(t.data.id,t.objectIds.size))}))}},s.process=function(e,t=(()=>!0)){if(r.isNone(this.tileInfo)||!e.extent||r.isSome(this.extent)&&!d.intersects(d.fromExtent(this.extent,this.tmpBoundingRect),e.extent))return new C(e);if(this.tiles.has(e.id))return new C(e);const i=this.createTileTree(e,this.tileInfo);return this.simplify(i,t,null,0,1),this.collectMissingTiles(e,i,this.tileInfo)},s.getFeatureCount=function(e){const t=this.tileFeatureCounts.get(e.id);return null!=t?t:0},s.fetchCount=async function(e,t,i,s){const r=this.tileFeatureCounts.get(e.id);if(null!=r)return r;const o=await S.executeQueryForCount(t,i,s);return this.tileFeatureCounts.set(e.id,o.data.count),o.data.count},s.createTileTree=function(e,t){const i=new F(e.level,e.row,e.col);return t.updateTileInfo(i,1),this.tileBounds.forEachInBounds(e.extent,(s=>{const r=this.tiles.get(s).data;this.tilesAreRelated(e,r)&&this.populateChildren(i,r,t,this.tileFeatureCounts.get(r.id)||0)})),i},s.tilesAreRelated=function(e,t){if(!e||!t)return!1;if(e.level===t.level)return e.row===t.row&&e.col===t.col;const i=e.level<t.level,s=i?e:t,r=i?t:e,o=1<<r.level-s.level;return Math.floor(r.row/o)===s.row&&Math.floor(r.col/o)===s.col},s.populateChildren=function(e,t,i,s){const o=t.level-e.level-1;if(o<0)return void(e.isLeaf=!0);const n=t.row>>o,l=t.col>>o,c=e.row<<1,u=l-(e.col<<1)+(n-c<<1),a=e.children[u];if(r.isSome(a))this.populateChildren(a,t,i,s);else{const r=new F(e.level+1,n,l);i.updateTileInfo(r,1),e.children[u]=r,this.populateChildren(r,t,i,s)}},s.simplify=function(e,t,i,s,o){const n=o*o;if(e.isLeaf)return t(this.getFeatureCount(e),o)?0:(this.remove(e),r.isSome(i)&&(i.children[s]=null),n);const l=o/2,c=l*l;let u=0;for(let a=0;a<e.children.length;a++){const i=e.children[a];u+=r.isSome(i)?this.simplify(i,t,e,a,l):c}return 0===u?this.mergeChildren(e):1-u/n<b&&(this.purge(e),r.isSome(i)&&(i.children[s]=null),u=n),u},s.mergeChildren=function(e){const t=new Set;let i=0;this.forEachLeaf(e,(e=>{const s=this.tiles.get(e.id);if(s){i+=s.byteSize;for(const e of s.objectIds)t.has(e)||(t.add(e),this.referenceFeature(e));this.remove(e)}})),this.addTileStorage(e,t,i),e.isLeaf=!0,e.children[0]=e.children[1]=e.children[2]=e.children[3]=null,this.tileFeatureCounts.set(e.id,t.size)},s.forEachLeaf=function(e,t){for(const i of e.children)r.isNone(i)||(i.isLeaf?t(i):this.forEachLeaf(i,t))},s.purge=function(e){if(!r.isNone(e))if(e.isLeaf)this.remove(e);else for(let t=0;t<e.children.length;t++){const i=e.children[t];this.purge(i),e.children[t]=null}},s.collectMissingTiles=function(e,t,i){const s=new T(i,e,this.extent);return this.collectMissingTilesRecurse(t,s,1),s.info},s.collectMissingTilesRecurse=function(e,t,i){if(e.isLeaf)return;if(!e.hasChildren)return void t.addMissing(e.level,e.row,e.col,i);const s=i/2;for(let o=0;o<e.children.length;o++){const i=e.children[o];r.isNone(i)?t.addMissing(e.level+1,(e.row<<1)+((2&o)>>1),(e.col<<1)+(1&o),s):this.collectMissingTilesRecurse(i,t,s)}},s.referenceFeature=function(e){const t=(this.refCounts.get(e)||0)+1;return this.refCounts.set(e,t),1===t?0:2},s.unreferenceFeature=function(e){const t=(this.refCounts.get(e)||0)-1;return 0===t?(this.refCounts.delete(e),1):(t>0&&this.refCounts.set(e,t),2)},s.byteSizeOfFeatures=function(e){let t=0;for(const i of e)t+=this.byteSizeOfFeature(i);return t},s.byteSizeOfFeature=function(e){return 32+this.byteSizeOfGeometry(e.geometry)+m.estimateAttributesObjectSize(e.attributes)},s.byteSizeOfGeometry=function(e){if(!e)return 0;const t=m.estimateFixedArraySize(e.lengths,4);return 32+m.estimateFixedArraySize(e.coords,8)+t},t._createClass(i,[{key:"debugInfo",get:function(){return Array.from(this.tiles.values()).map((({data:e})=>({data:e,featureCount:this.tileFeatureCounts.get(e.id)||0})))}},{key:"test",get:function(){return{tiles:Array.from(this.tiles.values()).map((e=>`${e.data.id}:[${Array.from(e.objectIds)}]`)),featureReferences:Array.from(this.refCounts.keys()).map((e=>`${e}:${this.refCounts.get(e)}`))}}}]),i}(f),i.__decorate([l.property({constructOnly:!0})],e.FeatureServiceTileStore.prototype,"featureStore",void 0),i.__decorate([l.property()],e.FeatureServiceTileStore.prototype,"tileInfo",void 0),i.__decorate([l.property()],e.FeatureServiceTileStore.prototype,"extent",void 0),i.__decorate([l.property()],e.FeatureServiceTileStore.prototype,"maximumByteSize",void 0),e.FeatureServiceTileStore=i.__decorate([c.subclass("esri.views.interactive.snapping.featureSources.featureServiceSource.FeatureServiceTileStore")],e.FeatureServiceTileStore);let v=function(e,t,i){this.data=e,this.objectIds=t,this.byteSize=i},F=function(){function e(e,t,i){this.level=e,this.row=t,this.col=i,this.isLeaf=!1,this.extent=null,this.children=[null,null,null,null]}return t._createClass(e,[{key:"hasChildren",get:function(){return!this.isLeaf&&(r.isSome(this.children[0])||r.isSome(this.children[1])||r.isSome(this.children[2])||r.isSome(this.children[3]))}}]),e}(),C=function(){function e(e,t=[]){this.missingTiles=t,this.fullArea=0,this.coveredArea=0,this.fullArea=d.area(e.extent),this.coveredArea=this.fullArea}return e.prototype.prepend=function(e){this.missingTiles=e.missingTiles.concat(this.missingTiles),this.coveredArea+=e.coveredArea,this.fullArea+=e.fullArea},e}(),T=function(){function e(e,t,i){this.tileInfo=e,this.extent=null,this.info=new C(t),r.isSome(i)&&(this.extent=d.fromExtent(i))}return e.prototype.addMissing=function(e,t,i,s){const o={id:null,level:e,row:t,col:i};this.tileInfo.updateTileInfo(o,1),!r.isSome(o.extent)||r.isSome(this.extent)&&!d.intersects(this.extent,o.extent)||(this.info.missingTiles.push({data:o,resolution:s}),this.info.coveredArea-=d.area(o.extent))},e}();const b=.18751;e.ProcessResult=C,Object.defineProperty(e,"__esModule",{value:!0})}));
