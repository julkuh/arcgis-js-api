// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports"],function(e,n){return{background:{"background.frag":"uniform lowp vec4 u_color;\nvoid main() {\n  gl_FragColor = u_color;\n}","background.vert":"attribute vec2 a_pos;\nuniform highp mat3 u_dvsMat3;\nuniform mediump float u_coord_range;\nuniform mediump float u_depth;\nvoid main() {\n  vec3 v_pos = u_dvsMat3 * vec3(u_coord_range * a_pos, 1.0);\n  gl_Position = vec4(v_pos.xy, 0.0, 1.0);\n}"},bitBlit:{"bitBlit.frag":"uniform lowp sampler2D u_tex;\nuniform lowp float u_opacity;\nvarying mediump vec2 v_uv;\nvoid main() {\n  lowp vec4 color = texture2D(u_tex, v_uv);\n  gl_FragColor = color *  u_opacity;\n}","bitBlit.vert":"attribute vec2 a_pos;\nattribute vec2 a_tex;\nvarying mediump vec2 v_uv;\nvoid main(void) {\n  gl_Position = vec4(a_pos, 0.0, 1.0);\n  v_uv = a_tex;\n}"},highlight:{"blur.frag":"varying mediump vec2 v_texcoord;\nuniform mediump vec4 u_direction;\nuniform mediump mat4 u_channelSelector;\nuniform mediump vec4 u_sigmas;\nuniform sampler2D u_texture;\nmediump vec4 gauss4(mediump vec2 dir) {\n  return exp(-dot(dir, dir) / (2.0 * u_sigmas * u_sigmas));\n}\nmediump float gauss1(mediump vec2 dir) {\n  return exp(-dot(dir, dir) / (2.0 * u_sigmas[3] * u_sigmas[3]));\n}\nmediump vec4 selectChannel(mediump vec4 sample) {\n  return u_channelSelector * sample;\n}\nvoid accumGauss4(mediump float i, inout mediump vec4 tot, inout mediump vec4 weight) {\n  mediump vec4 w = gauss4(i * u_direction.xy);\n  tot += selectChannel(texture2D(u_texture, v_texcoord + i * u_direction.zw)) * w;\n  weight += w;\n}\nvoid accumGauss1(mediump float i, inout mediump float tot, inout mediump float weight) {\n  mediump float w = gauss1(i * u_direction.xy);\n  tot += selectChannel(texture2D(u_texture, v_texcoord + i * u_direction.zw))[3] * w;\n  weight += w;\n}\nvoid main(void) {\n  mediump float tot = 0.0;\n  mediump float weight = 0.0;\n  accumGauss1(-4.0, tot, weight);\n  accumGauss1(-3.0, tot, weight);\n  accumGauss1(-2.0, tot, weight);\n  accumGauss1(-1.0, tot, weight);\n  accumGauss1(0.0, tot, weight);\n  accumGauss1(1.0, tot, weight);\n  accumGauss1(2.0, tot, weight);\n  accumGauss1(3.0, tot, weight);\n  accumGauss1(4.0, tot, weight);\n  gl_FragColor = vec4(0.0, 0.0, 0.0, tot / weight);\n}","highlight.frag":"varying mediump vec2 v_texcoord;\nuniform sampler2D u_texture;\nuniform mediump vec4 u_sigmas;\nuniform sampler2D u_shade;\nuniform mediump vec2 u_minMaxDistance;\nmediump float estimateDistance() {\n  mediump float sigma = u_sigmas[3];\n  mediump float y = texture2D(u_texture, v_texcoord)[3];\n  const mediump float y0 = 0.5;\n  mediump float m0 = 1.0 / (sqrt(2.0 * 3.1415) * sigma);\n  mediump float d = (y - y0) / m0;\n  return d;\n}\nmediump vec4 shade(mediump float d) {\n  mediump float mappedDistance = (d - u_minMaxDistance.x) / (u_minMaxDistance.y - u_minMaxDistance.x);\n  mappedDistance = clamp(mappedDistance, 0.0, 1.0);\n  return texture2D(u_shade, vec2(mappedDistance, 0.5));\n}\nvoid main(void) {\n  mediump float d = estimateDistance();\n  gl_FragColor = shade(d);\n}","textured.vert":"attribute mediump vec2 a_position;\nattribute mediump vec2 a_texcoord;\nvarying mediump vec2 v_texcoord;\nvoid main(void) {\n  gl_Position = vec4(a_position, 0.0, 1.0);\n  v_texcoord = a_texcoord;\n}"},magnifier:{"magnifier.frag":"uniform lowp vec4 u_background;\nuniform mediump sampler2D u_readbackTexture;\nuniform mediump sampler2D u_maskTexture;\nuniform mediump sampler2D u_overlyTexture;\nvarying mediump vec2 v_texCoord;\nvoid main(void)\n{\n  lowp vec4 color = texture2D(u_readbackTexture, v_texCoord);\n  color = color + (1.0 - color.a) * u_background;\n  lowp vec4 mask_color = texture2D(u_maskTexture, v_texCoord);\n  lowp float gray = 1.0 - dot(mask_color, vec4(0.3, 0.59, 0.11, 0));\n  color *= gray;\n  lowp vec4 overley_color = texture2D(u_overlyTexture, v_texCoord);\n  overley_color.rgb *= overley_color.a;\n  gl_FragColor = overley_color + (1.0 - overley_color.a) * color;\n}","magnifier.vert":"precision mediump float;\nattribute mediump vec2 a_pos;\nuniform mediump vec2 u_drawPos;\nuniform mediump float u_width;\nuniform mediump float u_height;\nvarying mediump vec2 v_texCoord;\nvoid main(void)\n{\n  v_texCoord = a_pos;\n  vec2 coord = u_drawPos + vec2(a_pos - 0.5) * vec2(u_width, u_height);\n  gl_Position = vec4(coord, 0.0, 1.0);\n}"},materials:{"attributeData.glsl":"uniform highp sampler2D u_attributeData0;\nuniform highp sampler2D u_attributeData1;\nuniform highp sampler2D u_attributeData2;\nuniform int u_attributeTextureSize;\nvec2 getAttributeDataCoords(in highp vec4 id) {\n  float size = float(u_attributeTextureSize);\n  highp float u32 = float(int(id.r) + int(id.g) * 256 + int(id.b) * 256 * 256 + int(id.a) * 256 * 256 * 256);\n  highp float col = mod(u32, size);\n  highp float row = (u32 - col) / size;\n  highp float u = col / size;\n  highp float v = row / size;\n  return vec2(u, v);\n}\nvec4 getAttributeData0(in vec4 id) {\n  vec2 coords = getAttributeDataCoords(id);\n  return texture2D(u_attributeData0, coords);\n}\nvec4 getAttributeData1(in vec4 id) {\n  vec2 coords = getAttributeDataCoords(id);\n  return texture2D(u_attributeData1, coords);\n}\nvec4 getAttributeData2(in vec4 id) {\n  vec2 coords = getAttributeDataCoords(id);\n  return texture2D(u_attributeData2, coords);\n}\nfloat u88VVToFloat(in vec2 v) {\n  bool isMagic = v.x == 255.0 && v.y == 255.0;\n  if (isMagic) {\n    return NAN_MAGIC_NUMBER;\n  }\n  return (v.x + v.y * float(0x100)) - 32768.0;\n}","constants.glsl":"const float C_DEG_TO_RAD = 3.14159265359 / 180.0;\nconst float SIGNED_BYTE_TO_UNSIGNED = 128.0;\nconst float SOFT_EDGE_RATIO = 1.0;\nconst float THIN_LINE_WIDTH_FACTOR = 1.1;\nconst float THIN_LINE_HALF_WIDTH = 1.0;\nconst float OFFSET_PRECISION = 1.0 / 8.0;\nconst float OUTLINE_SCALE = 1.0 / 5.0;\nconst float SDF_FONT_SIZE = 24.0;\nconst float MAX_SDF_DISTANCE = 8.0;\nconst float PLACEMENT_PADDING = 8.0;\nconst float EPSILON = 0.0000001;\nconst int MAX_FILTER_COUNT = 2;\nconst int ATTR_DATA_FILTER = 0;\nconst int ATTR_DATA_VV = 1;\nconst int ATTR_DATA_DD0 = 1;\nconst int ATTR_DATA_DD1 = 2;\nconst int ATTR_VV_SIZE = 0;\nconst int ATTR_VV_COLOR = 1;\nconst int ATTR_VV_OPACITY = 2;\nconst int ATTR_VV_ROTATION = 3;\nconst highp float NAN_MAGIC_NUMBER = 1e-30;","effects.glsl":"uniform mat4 u_insideEffectMat4[ MAX_FILTER_COUNT ];\nuniform mat4 u_outsideEffectMat4[ MAX_FILTER_COUNT ];\nuniform float u_insideOpacities[ MAX_FILTER_COUNT ];\nuniform float u_outsideOpacities[ MAX_FILTER_COUNT ];\nvec4 getEffectColor(in vec4 color, in float filterFlags) {\n  vec4 rgbw = vec4(color.a > 0.0 ? color.rgb / color.a : vec3(0.0), 1.0);\n  float a = color.a;\n  for (int i = 1; i < EFFECT_COUNT + 1; i++) {\n    float bit = getBit(filterFlags, i);\n    rgbw = u_insideEffectMat4[ i ] * (bit  * rgbw) + u_outsideEffectMat4[ i ] * ((1.0 - bit) * rgbw);\n    a    = u_insideOpacities[ i ]  * (bit  * a)    + u_outsideOpacities[ i ]  * ((1.0 - bit) * a);\n  }\n  return vec4(rgbw.rgb * a, a);\n}\nvec3 applyFilter(inout vec4 color, inout vec3 pos, in float filterFlags) {\n  vec4 rgbw = vec4(color.a > 0.0 ? color.rgb / color.a : vec3(0.0), 1.0);\n  float a = color.a;\n  for (int i = 0; i < EFFECT_COUNT + 1; i++) {\n    float bit = getBit(filterFlags, i);\n    rgbw = u_insideEffectMat4[ i ] * (bit  * rgbw) + u_outsideEffectMat4[ i ] * ((1.0 - bit) * rgbw);\n    a    = u_insideOpacities[ i ]  * (bit  * a)    + u_outsideOpacities[ i ]  * ((1.0 - bit) * a);\n  }\n  color.rgb = rgbw.rgb * a;\n  color.a = a;\n  pos.z += 2.0 * (1.0 - getBit(filterFlags, 0));\n  return pos;\n}\nvec3 applyFilterLabels(inout vec4 color, inout vec3 pos, in float filterFlags) {\n  float bit = getBit(filterFlags, 0);\n  pos.z += 2.0 * (1.0 - bit);\n#ifndef OUTSIDE_LABELS_VISIBLE\n  for (int i = 1; i < EFFECT_COUNT + 1; i++) {\n    float bit = getBit(filterFlags, i);\n    pos.z += 2.0 * (1.0 - bit);\n  }\n#endif\n  return pos;\n}",fill:{"common.glsl":"#ifdef PATTERN\nuniform mediump vec2 u_mosaicSize;\n#endif\n#ifdef DOT_DENSITY\nuniform float u_dotValue;\nuniform float u_tileDotsOverArea;\nuniform vec4 u_isActive[ 2 ];\nuniform float u_dotTextureDotCount;\nuniform float u_tileZoomFactor;\n#endif\nvarying vec3 v_pos;\nvarying lowp vec4 v_color;\nvarying lowp float v_opacity;\nvarying highp vec4 v_id;\n#ifdef PATTERN\nvarying mediump vec4 v_tlbr;\nvarying mediump vec2 v_tileTextureCoord;\n#endif\n#ifdef DOT_DENSITY\nvarying vec4 v_dotThresholds[ 2 ];\nvarying vec2 v_dotTextureCoords;\n#endif","fill.frag":"precision highp float;\n#include <materials/constants.glsl>\nvarying highp vec4 v_id;\n#ifdef PATTERN\nuniform lowp sampler2D u_texture;\nvarying mediump vec4 v_tlbr;\nvarying mediump vec2 v_tileTextureCoord;\n#endif\n#ifdef DOT_DENSITY\nuniform mediump mat4 u_dotColors[ 2 ];\nuniform sampler2D u_dotTextures[ 2 ];\nuniform vec4 u_dotBackgroundColor;\nvarying highp vec4 v_dotThresholds[ 2 ];\nvarying vec2 v_dotTextureCoords;\n#endif\nvarying lowp vec4 v_color;\nvarying lowp float v_opacity;\nfloat max4(vec4 target) {\n  return max(max(max(target.x, target.y), target.z), target.w);\n}\nvoid main() {\n#ifdef ID\n  gl_FragColor = v_id;\n#elif defined(PATTERN)\n  mediump vec2 normalizedTextureCoord = mod(v_tileTextureCoord, 1.0);\n  mediump vec2 samplePos = mix(v_tlbr.xy, v_tlbr.zw, normalizedTextureCoord);\n  lowp vec4 color = texture2D(u_texture, samplePos);\n  gl_FragColor = v_opacity * v_color * color;\n#elif defined(DOT_DENSITY) && !defined(HIGHLIGHT)\n  vec4 textureThresholds0 = texture2D(u_dotTextures[0], v_dotTextureCoords);\n  vec4 textureThresholds1 = texture2D(u_dotTextures[1], v_dotTextureCoords);\n  vec4 difference0 = v_dotThresholds[0] - textureThresholds0;\n  vec4 difference1 = v_dotThresholds[1] - textureThresholds1;\n#ifdef DD_DOT_BLENDING\n  vec4 isPositive0 = step(0.0, difference0);\n  vec4 isPositive1 = step(0.0, difference1);\n  float weightSum = dot(isPositive0, difference0) + dot(isPositive1, difference1);\n  float lessThanEqZero = step(weightSum, 0.0);\n  float greaterThanZero = 1.0 - lessThanEqZero ;\n  float divisor = (weightSum + lessThanEqZero);\n  vec4 weights0 = difference0 * isPositive0 / divisor;\n  vec4 weights1 = difference1 * isPositive1 / divisor;\n  vec4 dotColor = u_dotColors[0] * weights0 + u_dotColors[1] * weights1;\n  gl_FragColor = greaterThanZero * dotColor + lessThanEqZero * u_dotBackgroundColor;\n#else\n  float diffMax = max(max4(difference0), max4(difference1));\n  float lessThanZero = step(diffMax, 0.0);\n  float greaterOrEqZero = 1.0 - lessThanZero;\n  vec4 isMax0 = step(diffMax, difference0);\n  vec4 isMax1 = step(diffMax, difference1);\n  vec4 dotColor = u_dotColors[0] * isMax0 + u_dotColors[1] * isMax1;\n  gl_FragColor = greaterOrEqZero * dotColor + lessThanZero * u_dotBackgroundColor;\n#endif\n#else\n  gl_FragColor = v_opacity * v_color;\n#endif\n#ifdef HIGHLIGHT\n  gl_FragColor.a = 1.0;\n#endif\n}","fill.vert":"precision mediump float;\n#ifdef DOT_DENSITY\nattribute float a_inverseArea;\nvec4 a_color = vec4(0.0, 0.0, 0.0, 1.0);\nvec4 a_aux3 = vec4(0.0);\n#else\nattribute vec4 a_color;\nattribute vec4 a_tlbr;\nattribute vec4 a_aux1;\nattribute vec2 a_aux2;\nattribute vec4 a_aux3;\n#endif\n#include <materials/vcommon.glsl>\n#include <materials/fill/common.glsl>\n#ifdef DOT_DENSITY\nvec4 dotThreshold(vec4 featureAttrOverFeatureArea, float dotValue, float tileDotsOverArea) {\n  return featureAttrOverFeatureArea * (1.0 / dotValue)  * (1.0 / tileDotsOverArea);\n}\n#endif\n#ifdef PATTERN\nmat3 getPatternMatrix() {\n  mat3 patternMatrix = mat3(1.0);\n  vec2 aux2 = (1.0 / SIGNED_BYTE_TO_UNSIGNED) * a_aux2;\n  patternMatrix[0][0] = 1.0 / (u_zoomFactor * a_aux1.x * aux2.x);\n  patternMatrix[1][1] = 1.0 / (u_zoomFactor * a_aux1.y * aux2.y);\n  return patternMatrix;\n}\n#endif\nvoid main()\n{\n  INIT;\n  float a_bitSet = a_aux3.a;\n  v_color   = getColor(a_color, a_bitSet, 0);\n  v_opacity = getOpacity(a_bitSet, 1);\n  v_id      = norm(a_id);\n  v_pos     = u_dvsMat3 * vec3(a_pos, 1.);\n#ifdef PATTERN\n  vec2 symbolOffset = u_zoomFactor * (a_aux1.zw - SIGNED_BYTE_TO_UNSIGNED);\n  v_tileTextureCoord = (getPatternMatrix() * vec3(a_pos + symbolOffset, 1.0)).xy;\n  v_tlbr = a_tlbr / u_mosaicSize.xyxy;\n#elif defined(DOT_DENSITY)\n  vec4 ddAttributeData0 = getAttributeData1(a_id) * u_isActive[0] * a_inverseArea;\n  vec4 ddAttributeData1 = getAttributeData2(a_id) * u_isActive[1] * a_inverseArea;\n  float size = u_tileZoomFactor * 512.0 * 1.0 / u_pixelRatio;\n  v_dotThresholds[0] = dotThreshold(ddAttributeData0, u_dotValue, u_tileDotsOverArea);\n  v_dotThresholds[1] = dotThreshold(ddAttributeData1, u_dotValue, u_tileDotsOverArea);\n  v_dotTextureCoords = (a_pos + 0.5) / size;\n#endif\n  gl_Position = vec4(applyFilter(v_color, v_pos, getFilterFlags()), 1.0);\n}"},icon:{"common.glsl":"uniform vec2 u_mosaicSize;\nvarying vec3 v_pos;\nvarying lowp vec4 v_color;\nvarying lowp float v_opacity;\nvarying highp vec4 v_id;\nvarying vec2 v_tex;\nvarying vec2 v_size;\nvarying float v_filters;\n#ifdef SDF\nvarying float v_isThin;\nvarying float v_overridingOutlineColor;\nvarying lowp vec4 v_outlineColor;\nvarying mediump float v_outlineWidth;\nvarying mediump float v_distRatio;\n#endif","icon.frag":"precision mediump float;\n#include <materials/constants.glsl>\n#include <materials/utils.glsl>\n#include <util/encoding.glsl>\n#include <materials/effects.glsl>\n#include <materials/constants.glsl>\n#include <materials/icon/common.glsl>\nuniform lowp sampler2D u_texture;\nvoid main()\n{\n#ifdef SDF\n  lowp vec4 fillPixelColor = v_color;\n  float d = 0.5 - rgba2float(texture2D(u_texture, v_tex));\n  float size = max(v_size.x, v_size.y);\n  float dist = d * size * SOFT_EDGE_RATIO * v_distRatio;\n  fillPixelColor *= clamp(0.5 - dist, 0.0, 1.0);\n  float outlineWidth = v_outlineWidth;\n  #ifdef HIGHLIGHT\n    outlineWidth = max(outlineWidth, 4.0 * v_isThin);\n  #endif\n  if (outlineWidth > 0.25) {\n    lowp vec4 outlinePixelColor = v_overridingOutlineColor * v_color + (1.0 - v_overridingOutlineColor) * v_outlineColor;\n    float clampedOutlineSize = min(outlineWidth, size);\n    outlinePixelColor *= clamp(0.5 - abs(dist) + clampedOutlineSize * 0.5, 0.0, 1.0);\n    gl_FragColor = v_opacity * ((1.0 - outlinePixelColor.a) * fillPixelColor + outlinePixelColor);\n  }\n  else {\n    gl_FragColor = v_opacity * fillPixelColor;\n  }\n#else\n   lowp vec4 texColor = texture2D(u_texture, v_tex);\n   gl_FragColor = v_opacity * getEffectColor(texColor, v_filters);\n#endif\n#ifdef HIGHLIGHT\n  gl_FragColor.a = step(1.0 / 255.0, gl_FragColor.a);\n#endif\n#ifdef ID\n  if (gl_FragColor.a < 1.0 / 255.0) {\n    discard;\n  }\n  gl_FragColor = v_id;\n#endif\n}","icon.vert":"precision mediump float;\nattribute vec4 a_color;\nattribute vec4 a_outlineColor;\nattribute vec4 a_sizeAndOutlineWidth;\nattribute vec2 a_vertexOffset;\nattribute vec4 a_texAndBitSet;\n#include <materials/vcommon.glsl>\n#include <materials/icon/common.glsl>\nvec2 getMarkerSize(inout vec2 offset, inout vec2 baseSize, inout float outlineSize, in float referenceSize, in float bitSet) {\n#ifdef VV_SIZE\n  float r = getSize(baseSize.y) / referenceSize;\n  baseSize.xy *= r;\n  offset.xy *= r;\n  float scaleSymbolProportionally = getBit(bitSet, 3);\n  outlineSize *= scaleSymbolProportionally * (r - 1.0) + 1.0;\n#endif\n  return baseSize;\n}\nvec3 getOffset(in vec2 in_offset, float a_bitSet) {\n  float isMapAligned = getBit(a_bitSet, 0);\n  vec3  offset       = getRotation() * vec3(in_offset, 0.0);\n  return getMatrix(isMapAligned) * offset;\n}\nvoid main()\n{\n  INIT;\n  vec2  a_size   = a_sizeAndOutlineWidth.xy * a_sizeAndOutlineWidth.xy / 256.0;\n  vec2  a_offset = a_vertexOffset / 16.0;\n  vec2  a_tex    = a_texAndBitSet.xy;\n  float a_outlineSize = a_sizeAndOutlineWidth.z * a_sizeAndOutlineWidth.z / 256.0;\n  float a_bitSet = a_texAndBitSet.z;\n  v_color    = getColor(a_color, a_bitSet, 1);\n  v_opacity  = getOpacity(a_bitSet, 1);\n  v_size     = getMarkerSize(a_offset, a_size, a_outlineSize, a_sizeAndOutlineWidth.w * a_sizeAndOutlineWidth.w / 256.0, a_bitSet);\n  v_id       = norm(a_id);\n  v_filters  = getFilterFlags();\n  v_tex      = a_tex / u_mosaicSize;\n  v_pos      = u_dvsMat3 * vec3(a_pos, 1.0) + getOffset(a_offset, a_bitSet);\n#ifdef SDF\n  v_isThin   = getBit(a_bitSet, 2);\n  #ifdef VV_COLOR\n    v_overridingOutlineColor = v_isThin;\n  #else\n    v_overridingOutlineColor = 0.0;\n  #endif\n  v_outlineWidth = min(a_outlineSize, max(max(v_size.x, v_size.y) - 0.99, 0.0));\n  v_outlineColor = getEffectColor(a_outlineColor, v_filters);\n  v_distRatio = a_texAndBitSet.w / 126.0;\n#endif\n  gl_Position = vec4(applyFilter(v_color, v_pos, v_filters), 1.0);\n}"},label:{"common.glsl":"uniform mediump float u_zoomLevel;\nuniform float u_mapRotation;\nuniform float u_mapAligned;\nuniform vec2 u_mosaicSize;\nvarying mediump float v_antialiasingWidth;\nvarying mediump float v_edgeDistanceOffset;\nvarying mediump vec2 v_tex;\nvarying mediump vec4 v_color;\n#ifdef ID\nuniform mediump float u_fadeStep;\nvarying mediump float v_fadeStep;\n#endif","label.frag":"precision mediump float;\n#include <materials/label/common.glsl>\nuniform mediump sampler2D u_referenceTex;\nuniform mediump vec2 u_screenSize;\nuniform highp float u_pixelRatio;\nuniform lowp sampler2D u_texture;\nvoid main()\n{\n  mediump vec2 refTextPos = gl_FragCoord.xy / (u_pixelRatio * u_screenSize.xy);\n  mediump vec4 referenceFragment = texture2D(u_referenceTex, refTextPos);\n#ifdef ID\n  mediump float alpha = clamp(referenceFragment.a + v_fadeStep, 0.0, 1.0);\n  gl_FragColor = vec4(alpha);\n#else\n  lowp float fadeAlpha = referenceFragment.a;\n  lowp float dist = texture2D(u_texture, v_tex).a;\n  float glyphEdgeDistance = max(0.75 - v_edgeDistanceOffset, 0.25);\n  lowp float sdfAlpha = smoothstep(glyphEdgeDistance - v_antialiasingWidth, glyphEdgeDistance + v_antialiasingWidth, dist);\n  gl_FragColor = fadeAlpha * sdfAlpha * v_color;\n#endif\n}","label.vert":"precision mediump float;\nattribute vec4 a_color;\nattribute vec2 a_vertexOffset;\nattribute vec4 a_texAndSize;\nattribute vec4 a_refSymbolAndPlacementOffset;\nattribute vec4 a_zoomRangeAndEmpty;\n#include <materials/vcommon.glsl>\n#include <materials/label/common.glsl>\nfloat getZ(in float minZoom, in float maxZoom, in float angle) {\n  float glyphAngle = angle * 360.0 / 254.0;\n  float mapAngle = u_mapRotation * 360.0 / 254.0;\n  float diffAngle = min(360.0 - abs(mapAngle - glyphAngle), abs(mapAngle - glyphAngle));\n  float z = 0.0;\n  z += 2.0 * (1.0 - step(minZoom, u_zoomLevel));\n  z += 2.0 * (1.0 - step(u_zoomLevel, maxZoom));\n  z += 2.0 * u_mapAligned * step(90.0, diffAngle);\n  return z;\n}\nvoid main()\n{\n  INIT;\n  float groupMinZoom    = getMinZoom();\n  float glyphMinZoom    = a_zoomRangeAndEmpty.x;\n  float a_minZoom       = max(groupMinZoom, glyphMinZoom);\n  float a_maxZoom       = a_zoomRangeAndEmpty.y;\n  vec2  a_placementDir  = a_refSymbolAndPlacementOffset.zw - 1.0;\n  float a_refSymbolSize = a_refSymbolAndPlacementOffset.y;\n  float fontSize        = a_texAndSize.z;\n  float isHalo          = mod(a_pos, 2.0).x;\n  vec2  vertexOffset = a_vertexOffset * OFFSET_PRECISION;\n  vec3  pos          = vec3(floor(a_pos * 0.5), 1.0);\n  float z            = getZ(a_minZoom, a_maxZoom, a_refSymbolAndPlacementOffset.x);\n  float fontScale    = fontSize / SDF_FONT_SIZE;\n  float halfSize     = getSize(a_refSymbolSize) / 2.0;\n  v_color = a_color;\n  v_tex   = a_texAndSize.xy / u_mosaicSize;\n#ifdef ID\n  v_fadeStep = u_fadeStep;\n#endif\n  v_edgeDistanceOffset = isHalo * OUTLINE_SCALE * a_texAndSize.w / fontScale / MAX_SDF_DISTANCE;\n  v_antialiasingWidth  = 0.106 * SDF_FONT_SIZE / fontSize / u_pixelRatio;\n  vec2 placementOffset = a_placementDir * (halfSize + PLACEMENT_PADDING);\n  vec3 glyphOffset     = u_displayMat3 * vec3(vertexOffset + placementOffset, 0.0);\n  vec3 v_pos           = vec3((u_dvsMat3 * pos + glyphOffset).xy, z);\n  gl_Position = vec4(applyFilterLabels(v_color, v_pos, getFilterFlags()), 1.0);\n#ifdef DEBUG\n  v_color = vec4(a_color.rgb, z == 0.0 ? 1.0 : 0.645);\n#endif\n}"},line:{"common.glsl":"varying mediump vec2 v_normal;\nvarying mediump float v_lineHalfWidth;\nvarying lowp vec4 v_color;\nvarying lowp float v_opacity;\nvarying highp vec4 v_id;\nvarying vec3 v_pos;\n#ifdef PATTERN\nuniform mediump vec2 u_mosaicSize;\nvarying mediump vec4 v_tlbr;\nvarying mediump vec2 v_patternSize;\n#endif\n#if defined(PATTERN) || defined(SDF)\nvarying highp float v_accumulatedDistance;\n#endif","line.frag":"precision lowp float;\n#include <util/encoding.glsl>\n#include <materials/constants.glsl>\n#include <materials/line/common.glsl>\nuniform lowp float u_blur;\nuniform mediump float u_zoomFactor;\n#if defined(PATTERN) || defined(SDF)\nuniform sampler2D u_texture;\n#endif\n#ifdef SDF\nconst float sdfPatternHalfWidth = 15.5;\nconst float widthFactor = 2.0;\n#endif\nvoid main()\n{\n  mediump float thinLineFactor = max(THIN_LINE_WIDTH_FACTOR * step(v_lineHalfWidth, THIN_LINE_HALF_WIDTH), 1.0);\n  mediump float fragDist = length(v_normal) * v_lineHalfWidth;\n  lowp float alpha = clamp(thinLineFactor * (v_lineHalfWidth - fragDist) / (u_blur + thinLineFactor - 1.0), 0.0, 1.0);\n#if defined(SDF) && !defined(HIGHLIGHT)\n  mediump float lineHalfWidth = widthFactor * v_lineHalfWidth;\n  mediump float lineWidthRatio = lineHalfWidth / sdfPatternHalfWidth;\n  mediump float relativeTexX = mod((u_zoomFactor * v_accumulatedDistance + v_normal.x * lineHalfWidth) / (lineWidthRatio * v_patternSize.x), 1.0);\n  mediump float relativeTexY = 0.5 + 0.5 * v_normal.y;\n  mediump vec2 texCoord = mix(v_tlbr.xy, v_tlbr.zw, vec2(relativeTexX, relativeTexY));\n  mediump float d = rgba2float(texture2D(u_texture, texCoord)) - 0.5;\n  float dist = d * lineHalfWidth;\n  lowp vec4 fillPixelColor = v_opacity * alpha * clamp(0.5 - dist, 0.0, 1.0) * v_color;\n  gl_FragColor = fillPixelColor;\n#elif defined(PATTERN) && !defined(HIGHLIGHT)\n  mediump float relativeTexX = mod((u_zoomFactor * v_accumulatedDistance + v_normal.x * v_lineHalfWidth) / v_patternSize.x, 1.0);\n  mediump float relativeTexY = 0.5 + (v_normal.y * v_lineHalfWidth / v_patternSize.y);\n  mediump vec2 texCoord = mix(v_tlbr.xy, v_tlbr.zw, vec2(relativeTexX, relativeTexY));\n  lowp vec4 color = texture2D(u_texture, texCoord);\n  gl_FragColor = v_opacity * alpha * v_color * color;\n#else\n  gl_FragColor = v_opacity * alpha * v_color;\n#endif\n#ifdef HIGHLIGHT\n  gl_FragColor.a = step(1.0 / 255.0, gl_FragColor.a);\n#endif\n#ifdef ID\n  if (gl_FragColor.a < 1.0 / 255.0) {\n    discard;\n  }\n  gl_FragColor = v_id;\n#endif\n}","line.vert":"precision mediump float;\nattribute vec4 a_color;\nattribute vec4 a_offsetAndNormal;\nattribute vec2 a_accumulatedDistanceAndHalfWidth;\nattribute vec4 a_tlbr;\nattribute vec4 a_segmentDirection;\nattribute vec2 a_aux;\n#include <materials/vcommon.glsl>\n#include <materials/line/common.glsl>\nconst float SCALE = 1.0 / 31.0;\nfloat getBaseLineHalfWidth(in float in_lineHalfWidth) {\n#ifdef VV_SIZE\n  float referenceHalfWidth = a_aux.x * SCALE;\n  float lineWidth = 2.0 * in_lineHalfWidth;\n  return 0.5 * (in_lineHalfWidth / referenceHalfWidth) * getSize(lineWidth);\n#else\n  return in_lineHalfWidth;\n#endif\n}\nfloat getLineHalfWidth(in float baseWidth, in float aa) {\n  float halfWidth = max(baseWidth + aa, 0.45) + 0.1 * aa;\n#ifdef HIGHLIGHT\n  halfWidth = max(halfWidth, 2.0);\n#endif\n  return halfWidth;\n}\nvec2 getDist(in vec2 offset, in float halfWidth) {\n  float thinLineFactor = max(THIN_LINE_WIDTH_FACTOR * step(halfWidth, THIN_LINE_HALF_WIDTH), 1.0);\n#if defined(SDF) && !defined(HIGHLIGHT)\n  thinLineFactor *= 2.0;\n#endif\n  return thinLineFactor * halfWidth * offset * SCALE;\n}\nvoid main()\n{\n  INIT;\n  float a_bitSet          = a_segmentDirection.w;\n  float a_accumulatedDist = a_accumulatedDistanceAndHalfWidth.x;\n  float a_lineHalfWidth   = a_accumulatedDistanceAndHalfWidth.y * SCALE;\n  float aa                = 0.5 * u_antialiasing;\n  vec2  a_offset          = a_offsetAndNormal.xy;\n  float baseWidth = getBaseLineHalfWidth(a_lineHalfWidth);\n  float halfWidth = getLineHalfWidth(baseWidth, aa);\n  float z         = 2.0 * step(baseWidth, 0.0);\n  vec2  dist      = getDist(a_offset, halfWidth);\n  vec3  offset    = u_displayViewMat3 * vec3(dist, 0.0);\n  vec3  pos       = u_dvsMat3 * vec3(a_pos.xy, 1.0) + offset;\n  v_color         = getColor(a_color, a_bitSet, 0);\n  v_opacity       = getOpacity(a_bitSet, 0);\n  v_lineHalfWidth = halfWidth;\n  v_id            = norm(a_id);\n  v_normal        = a_offsetAndNormal.zw * SCALE;\n  v_pos           = vec3(pos.xy, z);\n#ifdef PATTERN\n  v_tlbr          = a_tlbr / u_mosaicSize.xyxy;\n  v_patternSize   = vec2(a_tlbr.z - a_tlbr.x, a_tlbr.w - a_tlbr.y);\n#endif\n#if defined(PATTERN) || defined(SDF)\n  v_accumulatedDistance = a_accumulatedDist + dot(SCALE * a_segmentDirection.xy, dist / u_zoomFactor);\n#endif\n  gl_Position = vec4(applyFilter(v_color, v_pos, getFilterFlags()), 1.0);\n}"},text:{"common.glsl":"uniform vec2 u_mosaicSize;\nvarying highp vec4 v_id;\nvarying vec3 v_pos;\nvarying vec4 v_color;\nvarying vec2 v_tex;\nvarying float v_opacity;\nvarying float v_antialiasingWidth;\nvarying float v_edgeDistanceOffset;\nvarying lowp float v_transparency;","text.frag":"precision mediump float;\n#include <materials/text/common.glsl>\nuniform lowp sampler2D u_texture;\nvoid main()\n{\n  lowp float dist = texture2D(u_texture, v_tex).a;\n  float glyphEdgeDistance = max(0.75 - v_edgeDistanceOffset, 0.25);\n  #ifdef HIGHLIGHT\n    glyphEdgeDistance /= 2.0;\n  #endif\n  lowp float alpha = smoothstep(glyphEdgeDistance - v_antialiasingWidth, glyphEdgeDistance + v_antialiasingWidth, dist) * v_opacity;\n  gl_FragColor = alpha * v_color;\n#ifdef ID\n  if (gl_FragColor.a < 1.0 / 255.0) {\n    discard;\n  }\n  gl_FragColor = v_id;\n#endif\n}","text.vert":"precision mediump float;\n#include <materials/vcommon.glsl>\n#include <materials/text/common.glsl>\nattribute vec4 a_color;\nattribute vec2 a_vertexOffset;\nattribute vec4 a_texFontSize;\nattribute vec4 a_aux;\nvoid main()\n{\n  INIT;\n  float a_bitSet    = a_aux.w;\n  float a_fontSize  = a_texFontSize.z;\n  vec2  a_offset    = a_vertexOffset * OFFSET_PRECISION;\n  float a_isHalo    = getBit(a_pos.x, 0);\n  vec3  in_pos      = vec3(floor(a_pos * 0.5), 1.0);\n  float fontSize    = getSize(a_fontSize);\n  float scaleFactor = fontSize / a_fontSize;\n  float fontScale   = fontSize / SDF_FONT_SIZE;\n  vec3  offset      = getRotation() * vec3(scaleFactor * a_offset, 0.0);\n  v_color   = a_isHalo * a_color + (1.0 - a_isHalo) * getColor(a_color, a_bitSet, 0);\n  v_opacity = getOpacity(a_bitSet, 0);\n  v_id      = norm(a_id);\n  v_tex     = a_texFontSize.xy / u_mosaicSize;\n  v_pos     = u_dvsMat3 * in_pos + u_displayMat3 * offset;\n  v_edgeDistanceOffset = a_isHalo * OUTLINE_SCALE * a_texFontSize.w / fontScale / MAX_SDF_DISTANCE;\n  v_antialiasingWidth  = 0.105 * SDF_FONT_SIZE / fontSize / u_pixelRatio;\n  gl_Position =  vec4(applyFilter(v_color, v_pos, getFilterFlags()), 1.0);\n}"},"utils.glsl":"float rshift(in float u32, in int amount) {\n  return floor(u32 / pow(2.0, float(amount)));\n}\nfloat getBit(in float bitset, in int bitIndex) {\n  float offset = pow(2.0, float(bitIndex));\n  return mod(floor(bitset / offset), 2.0);\n}\nvec4 unpack(in float u32) {\n  float r = mod(rshift(u32, 0), 255.0);\n  float g = mod(rshift(u32, 8), 255.0);\n  float b = mod(rshift(u32, 16), 255.0);\n  float a = mod(rshift(u32, 24), 255.0);\n  return vec4(r, g, b, a);\n}\nvec4 norm(in vec4 v) {\n  return v /= 255.0;\n}","vcommon.glsl":"#include <materials/constants.glsl>\n#include <materials/utils.glsl>\n#include <materials/attributeData.glsl>\n#include <materials/vv.glsl>\n#include <materials/effects.glsl>\nattribute vec2 a_pos;\nattribute highp vec4 a_id;\nuniform highp mat3 u_dvsMat3;\nuniform highp mat3 u_displayMat3;\nuniform highp mat3 u_displayViewMat3;\nuniform highp float u_pixelRatio;\nuniform mediump float u_zoomFactor;\nuniform mediump float u_antialiasing;\nvec4 VV_ADATA = vec4(0.0);\nvoid loadVisualVariableData(inout vec4 target, int index) {\n#ifdef OES_TEXTURE_FLOAT\n  target.rgba = getAttributeData1(a_id);\n#else\n  vec4 data0 = getAttributeData1(a_id);\n  vec4 data1 = getAttributeData2(a_id);\n  target.r = u88VVToFloat(data0.rg * 255.0);\n  target.g = u88VVToFloat(data0.ba * 255.0);\n  target.b = u88VVToFloat(data1.rg * 255.0);\n  target.a = u88VVToFloat(data1.ba * 255.0);\n#endif\n}\n#ifdef VV\n  #define INIT loadVisualVariableData(VV_ADATA, ATTR_DATA_VV)\n#else\n  #define INIT\n#endif\nvec4 getColor(in vec4 a_color, in float a_bitSet, int index) {\n#ifdef VV_COLOR\n  float isColorLocked   = getBit(a_bitSet, index);\n  return getVVColor(VV_ADATA[ATTR_VV_COLOR], a_color, isColorLocked);\n#else\n  return a_color;\n#endif\n}\nfloat getOpacity(in float a_bitSet, in int index) {\n#ifdef VV_OPACITY\n  float isOpacityLocked = getBit(a_bitSet, index);\n  return getVVOpacity(VV_ADATA[ATTR_VV_OPACITY], isOpacityLocked);\n#else\n  return 1.0;\n#endif\n}\nfloat getSize(in float in_size) {\n#ifdef VV_SIZE\n  return getVVSize(in_size, VV_ADATA[ATTR_VV_SIZE]);\n#else\n  return in_size;\n#endif\n}\nmat3 getRotation() {\n#ifdef VV_ROTATION\n  return getVVRotationMat3(VV_ADATA[ATTR_VV_ROTATION]);\n#else\n  return mat3(1.0);\n#endif\n}\nfloat getFilterFlags() {\n  return getAttributeData0(a_id).x * 255.0;\n}\nfloat getMinZoom() {\n  vec4 data0 = getAttributeData0(a_id) * 255.0;\n  return data0.g;\n}\nmat3 getMatrix(float isMapAligned) {\n  return isMapAligned * u_displayViewMat3 + (1.0 - isMapAligned) * u_displayMat3;\n}","vv.glsl":"#if defined(VV_SIZE_MIN_MAX_VALUE) || defined(VV_SIZE_SCALE_STOPS) || defined(VV_SIZE_FIELD_STOPS) || defined(VV_SIZE_UNIT_VALUE)\n  #define VV_SIZE\n#endif\n#if defined(VV_COLOR) || defined(VV_SIZE) || defined(VV_OPACITY) || defined(VV_ROTATION)\n  #define VV\n#endif\n#ifdef VV_COLOR\nuniform highp float u_vvColorValues[8];\nuniform vec4 u_vvColors[8];\n#endif\n#ifdef VV_SIZE_MIN_MAX_VALUE\nuniform highp vec4 u_vvSizeMinMaxValue;\n#endif\n#ifdef VV_SIZE_SCALE_STOPS\nuniform highp float u_vvSizeScaleStopsValue;\n#endif\n#ifdef VV_SIZE_FIELD_STOPS\nuniform highp float u_vvSizeFieldStopsValues[6];\nuniform float u_vvSizeFieldStopsSizes[6];\n#endif\n#ifdef VV_SIZE_UNIT_VALUE\nuniform highp float u_vvSizeUnitValueWorldToPixelsRatio;\n#endif\n#ifdef VV_OPACITY\nuniform highp float u_vvOpacityValues[8];\nuniform float u_vvOpacities[8];\n#endif\n#ifdef VV_ROTATION\nuniform lowp float u_vvRotationType;\n#endif\nbool isNan(float val) {\n  return (val == NAN_MAGIC_NUMBER);\n}\n#ifdef VV_SIZE_MIN_MAX_VALUE\nfloat getVVMinMaxSize(float sizeValue, float fallback) {\n  if (isNan(sizeValue)) {\n    return fallback;\n  }\n  float interpolationRatio = (sizeValue  - u_vvSizeMinMaxValue.x) / (u_vvSizeMinMaxValue.y - u_vvSizeMinMaxValue.x);\n  interpolationRatio = clamp(interpolationRatio, 0.0, 1.0);\n  return u_vvSizeMinMaxValue.z + interpolationRatio * (u_vvSizeMinMaxValue.w - u_vvSizeMinMaxValue.z);\n}\n#endif\n#ifdef VV_SIZE_FIELD_STOPS\nconst int VV_SIZE_N = 6;\nfloat getVVStopsSize(float sizeValue, float fallback) {\n  if (isNan(sizeValue)) {\n    return fallback;\n  }\n  if (sizeValue <= u_vvSizeFieldStopsValues[0]) {\n    return u_vvSizeFieldStopsSizes[0];\n  }\n  for (int i = 1; i < VV_SIZE_N; ++i) {\n    if (u_vvSizeFieldStopsValues[i] >= sizeValue) {\n      float f = (sizeValue - u_vvSizeFieldStopsValues[i-1]) / (u_vvSizeFieldStopsValues[i] - u_vvSizeFieldStopsValues[i-1]);\n      return mix(u_vvSizeFieldStopsSizes[i-1], u_vvSizeFieldStopsSizes[i], f);\n    }\n  }\n  return u_vvSizeFieldStopsSizes[VV_SIZE_N - 1];\n}\n#endif\n#ifdef VV_SIZE_UNIT_VALUE\nfloat getVVUnitValue(float sizeValue, float fallback) {\n  if (isNan(sizeValue)) {\n    return fallback;\n  }\n  return u_vvSizeUnitValueWorldToPixelsRatio * sizeValue;\n}\n#endif\n#ifdef VV_OPACITY\nconst int VV_OPACITY_N = 8;\nfloat getVVOpacity(float opacityValue, float isOpacityLocked) {\n  if (isNan(opacityValue) || isOpacityLocked == 1.0) {\n    return 1.0;\n  }\n  if (opacityValue <= u_vvOpacityValues[0]) {\n    return u_vvOpacities[0];\n  }\n  for (int i = 1; i < VV_OPACITY_N; ++i) {\n    if (u_vvOpacityValues[i] >= opacityValue) {\n      float f = (opacityValue - u_vvOpacityValues[i-1]) / (u_vvOpacityValues[i] - u_vvOpacityValues[i-1]);\n      return mix(u_vvOpacities[i-1], u_vvOpacities[i], f);\n    }\n  }\n  return u_vvOpacities[VV_OPACITY_N - 1];\n}\n#endif\n#ifdef VV_ROTATION\nmat4 getVVRotation(float rotationValue) {\n  if (isNan(rotationValue)) {\n    return mat4(1, 0, 0, 0,\n                0, 1, 0, 0,\n                0, 0, 1, 0,\n                0, 0, 0, 1);\n  }\n  float rotation = rotationValue;\n  if (u_vvRotationType == 1.0) {\n    rotation = 90.0 - rotation;\n  }\n  float angle = C_DEG_TO_RAD * rotation;\n  float sinA = sin(angle);\n  float cosA = cos(angle);\n  return mat4(cosA, sinA, 0, 0,\n              -sinA,  cosA, 0, 0,\n              0,     0, 1, 0,\n              0,     0, 0, 1);\n}\nmat3 getVVRotationMat3(float rotationValue) {\n  if (isNan(rotationValue)) {\n    return mat3(1, 0, 0,\n                0, 1, 0,\n                0, 0, 1);\n  }\n  float rotation = rotationValue;\n  if (u_vvRotationType == 1.0) {\n    rotation = 90.0 - rotation;\n  }\n  float angle = C_DEG_TO_RAD * -rotation;\n  float sinA = sin(angle);\n  float cosA = cos(angle);\n  return mat3(cosA, -sinA, 0,\n             sinA, cosA, 0,\n              0,    0,    1);\n}\n#endif\n#ifdef VV_COLOR\nconst int VV_COLOR_N = 8;\nvec4 getVVColor(float colorValue, vec4 fallback, float isColorLocked) {\n  if (isNan(colorValue) || isColorLocked == 1.0) {\n    return fallback;\n  }\n  if (colorValue <= u_vvColorValues[0]) {\n    return u_vvColors[0];\n  }\n  for (int i = 1; i < VV_COLOR_N; ++i) {\n    if (u_vvColorValues[i] >= colorValue) {\n      float f = (colorValue - u_vvColorValues[i-1]) / (u_vvColorValues[i] - u_vvColorValues[i-1]);\n      return mix(u_vvColors[i-1], u_vvColors[i], f);\n    }\n  }\n  return u_vvColors[VV_COLOR_N - 1];\n}\n#endif\nfloat getVVSize(in float size, in float vvSize)  {\n#ifdef VV_SIZE_MIN_MAX_VALUE\n  return getVVMinMaxSize(vvSize, size);\n#elif defined(VV_SIZE_SCALE_STOPS)\n  return u_vvSizeScaleStopsValue;\n#elif defined(VV_SIZE_FIELD_STOPS)\n  return getVVStopsSize(vvSize, size);\n#elif defined(VV_SIZE_UNIT_VALUE)\n  return getVVUnitValue(vvSize, size);\n#else\n  return size;\n#endif\n}"},raster:{"solid.frag":"precision mediump float;\nvoid main(void) {\n  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n}","texture.frag":"precision mediump float;\nvarying highp vec2 v_texcoord;\nuniform sampler2D u_texture;\nuniform float u_opacity;\nvoid main(void) {\n  vec4 color = texture2D(u_texture, v_texcoord);\n  color.a *= u_opacity;\n  gl_FragColor = vec4(color.rgb * color.a, color.a);\n}","transform.vert":"precision mediump float;\nattribute vec2 a_position;\nuniform highp mat4 u_transform;\nvarying highp vec2 v_texcoord;\nvoid main(void) {\n  gl_Position = u_transform * vec4((2.0 * a_position - 1.0), 0.0, 1.0);\n  v_texcoord = a_position;\n}"},stencil:{"stencil.frag":"void main() {\n  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}","stencil.vert":"attribute vec2 a_pos;\nvoid main() {\n  gl_Position = vec4(a_pos, 0.0, 1.0);\n}"},tileInfo:{"tileInfo.frag":"uniform mediump sampler2D u_texture;\nvarying mediump vec2 v_tex;\nvoid main(void) {\n  lowp vec4 color = texture2D(u_texture, v_tex);\n  gl_FragColor = 0.75 * color;\n}","tileInfo.vert":"attribute vec2 a_pos;\nuniform highp mat3 u_dvsMat3;\nuniform mediump float u_depth;\nuniform mediump float u_coord_ratio;\nuniform mediump vec2 u_delta;\nuniform mediump vec2 u_dimensions;\nvarying mediump vec2 v_tex;\nvoid main() {\n  mediump vec2 offset = u_coord_ratio * vec2(u_delta + a_pos * u_dimensions);\n  vec3 v_pos = u_dvsMat3 * vec3(offset, 1.0);\n  gl_Position = vec4(v_pos.xy, 0.0, 1.0);\n  v_tex = a_pos;\n}"},util:{"encoding.glsl":"const vec4 rgba2float_factors = vec4(\n    255.0 / (256.0),\n    255.0 / (256.0 * 256.0),\n    255.0 / (256.0 * 256.0 * 256.0),\n    255.0 / (256.0 * 256.0 * 256.0 * 256.0)\n  );\nfloat rgba2float(vec4 rgba) {\n  return dot(rgba, rgba2float_factors);\n}"}}});