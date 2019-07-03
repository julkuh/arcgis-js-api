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

define(["require","exports"],function(t,_){Object.defineProperty(_,"__esModule",{value:!0});var i=function(){function t(){this.m_version=10,this.m_real_exercise_sim=0,this.m_affiliation=1,this.m_symbol_set=10,this.m_status=0,this.m_HQ_TF_FD=0,this.m_echelon_mobility=0}return t.prototype.fromFullCode=function(t){this.m_version=parseInt(t.substring(0,2),10),this.m_real_exercise_sim=parseInt(t.substring(2,3),10),this.m_affiliation=parseInt(t.substring(3,4),10),this.m_symbol_set=parseInt(t.substring(4,6),10),this.m_status=parseInt(t.substring(6,7),10),this.m_HQ_TF_FD=parseInt(t.substring(7,8),10),this.m_echelon_mobility=parseInt(t.substring(8,10),10),this.m_entity_code=t.substring(10,16),this.m_modifier1=t.substring(16,18),this.m_modifier2=t.substring(18,20)},t.prototype.setRandom=function(){var t="";t+="10",t+=Math.floor(2.999*Math.random()),t+=Math.floor(1+5.999*Math.random());var _=[1,2,5,6,10,11,15,20,25,30,35,36,40,45,46,47,50,51,52,53,54,60,98];Math.floor(Math.random()*(_.length-.001));t+=10,t+=Math.floor(6.999*Math.random()),t+=Math.floor(7.999*Math.random());var i,s=[0,10,11,12,13,14,15,16,17,18,21,22,23,24,25,26,31,32,33,34,35,36,37,41,42,51,52,61,62],e=s[Math.floor(Math.random()*(s.length-.001))];e<10&&(t+="0"),t+=e,t+=(i=["110000","110100","110200","110300","110400","110500","110600","110601","110700","110800","110900","111100","111200","120200","120500","120600","120700","120800","120900","121000","121200","121400","121500","121600","121700","121800","121801","121803","121804","121805","121900","130300","130301","130400","130500","130600","130700","130800","130801","130802","130803","130900","140100","140101","140200","140300","140400","140500","140600","140700","140701","140800","140900","141000","141100","141200","141300","141400","141500","141600","141700","141701","141800","141900","142000","142100","150100","150200","150300","150400","150500","150501","150502","150503","150505","150600","150700","150900","151000","151100","151200","160000","160100","160300","160400","160500","160600","160700","160800","160900","161000","161100","161500","161600","162300","162400","162500","162600","162700","162800","162900","163000","163100","163200","163300","163500","163600","164700","164800","164900","170100","180100","180200","180300","180400","190000","200000","200100","200200","200300","200400","200500","200600","200700","200800","200900","201000","201100","201200","201300"])[Math.floor(Math.random()*(i.length-.001))],t+="00",t+="00",this.fromFullCode(t)},t.prototype.is_valid=function(){switch(this.m_symbol_set){case 0:case 99:return!1;default:return!0}},t.prototype.is_land_unit_special_entity_subtype=function(){return 0<this.special_entity_subtype().length},t.prototype.special_entity_subtype=function(){var t="";if(10!==this.m_symbol_set||6!==this.m_entity_code.length)return t;var _=this.m_entity_code.substring(4,6);return"95"!==_&&"96"!==_&&"97"!==_&&"98"!==_||(t=_),t},t.prototype.is_control_measure=function(){return 25===this.m_symbol_set},t.prototype.is_weather=function(){return 46===this.m_symbol_set||45===this.m_symbol_set},t.prototype.has_frame=function(){switch(this.m_symbol_set){case 25:case 45:case 46:case 47:case 98:return!1;case 30:return"150000"!==this.m_entity_code;default:return!0}},t.prototype.has_amplifiers=function(){switch(this.m_symbol_set){case 25:case 45:case 46:case 47:return!1;default:return!0}},t}();_.Mil2525dCode=i;var s=function(){function t(){this.ms_symbol_set_to_frame_map={},this.ms_affiliation_to_frame_map={},this.ms_affiliation_to_suffix_name_alt={},this.ms_symbol_set_to_frame_map[0]=0,this.ms_symbol_set_to_frame_map[99]=0,this.ms_symbol_set_to_frame_map[1]=1,this.ms_symbol_set_to_frame_map[2]=1,this.ms_symbol_set_to_frame_map[5]=5,this.ms_symbol_set_to_frame_map[6]=5,this.ms_symbol_set_to_frame_map[10]=10,this.ms_symbol_set_to_frame_map[11]=10,this.ms_symbol_set_to_frame_map[15]=30,this.ms_symbol_set_to_frame_map[20]=20,this.ms_symbol_set_to_frame_map[25]=0,this.ms_symbol_set_to_frame_map[60]=30,this.ms_symbol_set_to_frame_map[45]=0,this.ms_symbol_set_to_frame_map[46]=0,this.ms_symbol_set_to_frame_map[47]=0,this.ms_symbol_set_to_frame_map[30]=30,this.ms_symbol_set_to_frame_map[35]=35,this.ms_symbol_set_to_frame_map[36]=35,this.ms_symbol_set_to_frame_map[40]=40,this.ms_symbol_set_to_frame_map[50]=5,this.ms_symbol_set_to_frame_map[51]=1,this.ms_symbol_set_to_frame_map[52]=30,this.ms_symbol_set_to_frame_map[53]=30,this.ms_symbol_set_to_frame_map[54]=35,this.ms_symbol_set_to_frame_map[98]=0,this.ms_affiliation_to_frame_map[0]=1,this.ms_affiliation_to_frame_map[1]=1,this.ms_affiliation_to_frame_map[2]=3,this.ms_affiliation_to_frame_map[3]=3,this.ms_affiliation_to_frame_map[4]=4,this.ms_affiliation_to_frame_map[5]=6,this.ms_affiliation_to_frame_map[6]=6,this.ms_affiliation_to_frame_map[8]=1,this.ms_affiliation_to_suffix_name_alt[0]="_1",this.ms_affiliation_to_suffix_name_alt[1]="_1",this.ms_affiliation_to_suffix_name_alt[2]="_3",this.ms_affiliation_to_suffix_name_alt[3]="_3",this.ms_affiliation_to_suffix_name_alt[4]="_4",this.ms_affiliation_to_suffix_name_alt[5]="_6",this.ms_affiliation_to_suffix_name_alt[6]="_6",this.ms_affiliation_to_suffix_name_alt[7]="_1",this.ms_affiliation_to_suffix_name_alt[8]="_1"}return t.prototype.symbol_set_to_frame=function(t){var _=this.ms_symbol_set_to_frame_map[t];return void 0===_&&(_=0),_},t.prototype.affiliation_to_frame=function(t){var _=this.ms_affiliation_to_frame_map[t];return void 0===_&&(_=1),_},t.prototype.affiliation_to_suffix_name_alt=function(t){return this.ms_affiliation_to_suffix_name_alt[t]},t.prototype.str_identity=function(t){return t.toString()},t.prototype.str_affiliation=function(t){return t.toString()},t.prototype.str_symbol_set=function(t){var _="";return t<10&&(_+="0"),_+=t},t.prototype.str_status=function(t){return t.toString()},t.prototype.str_hq_tf_fd=function(t){return t.toString()},t.prototype.str_echelon_mobility=function(t){var _="";return t<10&&(_+="0"),_+=t},t.prototype.get_frame_icon_=function(t){if(7===t.m_affiliation)return"";var _="";switch(t.m_real_exercise_sim){case 0:_+="0";break;case 1:_+="1";break;case 2:_+="2";break;default:_+="0"}_+="_",_+=this.str_affiliation(t.m_affiliation);var i=this.symbol_set_to_frame(t.m_symbol_set);if(_+=this.str_symbol_set(i),1===t.m_status)switch(t.m_affiliation){case 3:case 6:case 4:case 1:_+="_1";break;default:_+="_0"}else _+="_0";return _},t.prototype.get_main_icon_=function(t){var _=this.str_symbol_set(t.m_symbol_set);(t.is_land_unit_special_entity_subtype()&&4<t.m_entity_code.length?(_+=t.m_entity_code.substring(0,4),_+="00"):_+=t.m_entity_code,t.is_control_measure())?_+=this.affiliation_to_suffix_name_alt(t.m_affiliation):t.is_weather()&&(_+="_C");return _},t.prototype.get_modifier1_icon_=function(t){if(!t.m_modifier1||0===t.m_modifier1.length)return"";var _=this.str_symbol_set(t.m_symbol_set);return _+=t.m_modifier1,_+="1"},t.prototype.get_modifier2_icon_=function(t){if(!t.m_modifier2||0===t.m_modifier2.length)return"";var _=this.str_symbol_set(t.m_symbol_set);return _+=t.m_modifier2,_+="1"},t.prototype.get_echelon_mobility_icon_=function(t){if(0===t.m_echelon_mobility)return"";var _="",i=this.affiliation_to_frame(t.m_affiliation);return _+=this.str_affiliation(i),_+=this.str_echelon_mobility(t.m_echelon_mobility)},t.prototype.get_hq_tf_fd_icon_=function(t){if(0===t.m_HQ_TF_FD)return"";var _="",i=this.affiliation_to_frame(t.m_affiliation);_+=this.str_affiliation(i);var s=this.symbol_set_to_frame(t.m_symbol_set);switch(s){case 40:case 99:case 0:s=10}return _+=this.str_symbol_set(s),_+=this.str_hq_tf_fd(t.m_HQ_TF_FD)},t.prototype.get_op_condition_icon_=function(t){switch(t.m_status){case 1:case 0:case 6:return""}var _="";_+="0";var i=this.affiliation_to_frame(t.m_affiliation);_+=this.str_affiliation(i);var s=this.symbol_set_to_frame(t.m_symbol_set);return _+=this.str_symbol_set(s),_+=this.str_status(t.m_status),_+="2"},t.prototype.get_symbol_keys=function(t){var _=[];if(!t.is_valid())return _;var i=t.has_frame();if(i){var s=this.get_frame_icon_(t);0<s.length&&_.push(s)}var e=this.get_main_icon_(t);if(0<e.length&&_.push(e),i){var o=this.get_modifier1_icon_(t);0<o.length&&_.push(o);var a=this.get_modifier2_icon_(t);if(0<a.length&&_.push(a),t.has_amplifiers()){var m=this.get_echelon_mobility_icon_(t);0<m.length&&_.push(m);var r=this.get_hq_tf_fd_icon_(t);0<r.length&&_.push(r);var n=this.get_op_condition_icon_(t);0<n.length&&_.push(n)}}return _},t}();_.Mil2525dEngine=s});