/**
 * 佛堂照片列表
 * 這些照片存放在 Cloudinary
 * 
 * 注意:照片順序是按照原始檔名字串排序
 */

export interface TemplePhoto {
  publicId: string;
  title: string;
  date?: string;
}

export const TEMPLE_PHOTOS: TemplePhoto[] = [
  { publicId: 'daoyi-web/temples/photo_1767408433429_785_001', title: '道一誕生鼓掌', date: '20021105' },
  { publicId: 'daoyi-web/temples/photo_1767408436432_91_002', title: '萬津萬松佛堂', date: '20021105' },
  { publicId: 'daoyi-web/temples/photo_1767408438707_891_003', title: '萬松佛堂開壇', date: '20021105' },
  { publicId: 'daoyi-web/temples/photo_1767408441590_280_004', title: '北海佛堂開壇', date: '930606' },
  { publicId: 'daoyi-web/temples/photo_1767408444660_58_005', title: '北海佛堂開壇', date: '930606' },
  { publicId: 'daoyi-web/temples/photo_1767408447293_368_006', title: '北海佛堂' },
  { publicId: 'daoyi-web/temples/photo_1767408450006_510_007', title: '北海開壇', date: '20040606' },
  { publicId: 'daoyi-web/temples/photo_1767408451893_397_008', title: '勞勿萬德佛堂開壇', date: '20110911' },
  { publicId: 'daoyi-web/temples/photo_1767408453631_261_009', title: '勞勿萬德佛堂開壇' },
  { publicId: 'daoyi-web/temples/photo_1767408455602_968_010', title: '勞勿萬德佛堂開壇' },
  { publicId: 'daoyi-web/temples/photo_1767408457201_124_011', title: '總壇開壇照', date: '20080915' },
  { publicId: 'daoyi-web/temples/photo_1767408460176_256_012', title: '勞勿萬德佛堂開壇' },
  { publicId: 'daoyi-web/temples/photo_1767408461696_837_013', title: '勞勿萬德佛堂開壇' },
  { publicId: 'daoyi-web/temples/photo_1767408463748_464_014', title: '勞勿萬德佛堂', date: '20120708' },
  { publicId: 'daoyi-web/temples/photo_1767408468995_428_015', title: '勞勿萬德佛堂' },
  { publicId: 'daoyi-web/temples/photo_1767408474065_576_016', title: '中馬慈心佛堂' },
  { publicId: 'daoyi-web/temples/photo_1767408478136_56_017', title: '中馬慈心佛堂' },
  { publicId: 'daoyi-web/temples/photo_1767408483745_627_018', title: '馬六甲佛堂開壇' },
  { publicId: 'daoyi-web/temples/photo_1767408485972_681_019', title: '馬六甲公共佛堂', date: '20070328' },
  { publicId: 'daoyi-web/temples/photo_1767408489791_256_020', title: '南洋道務三十年', date: '20090503' },
  { publicId: 'daoyi-web/temples/photo_1767408493536_429_021', title: '南洋道務三十年回顧', date: '20090503' },
  { publicId: 'daoyi-web/temples/photo_1767408496605_500_022', title: '道一聖道院', date: '20030809' },
  { publicId: 'daoyi-web/temples/photo_1767408502352_885_023', title: '新山皇后中心佛堂', date: '20090505' },
  { publicId: 'daoyi-web/temples/photo_1767408504767_66_024', title: '新山東方佛堂', date: '20101121' },
  { publicId: 'daoyi-web/temples/photo_1767408510243_42_025', title: '新山東方佛堂', date: '20050616' },
  { publicId: 'daoyi-web/temples/photo_1767408512794_883_026', title: '新加坡妙星聖堂', date: '20011101' },
  { publicId: 'daoyi-web/temples/photo_1767408515397_589_027', title: '新加坡妙星聖堂' },
  { publicId: 'daoyi-web/temples/photo_1767408517489_965_028', title: '新加坡妙星聖堂' },
  { publicId: 'daoyi-web/temples/photo_1767408520448_260_029', title: '妙星聖堂開壇', date: '1020721' },
  { publicId: 'daoyi-web/temples/photo_1767408527130_397_030', title: '新加坡妙星聖堂' },
  { publicId: 'daoyi-web/temples/photo_1767408533986_824_031', title: '新妙星聖堂' },
  { publicId: 'daoyi-web/temples/photo_1767408536196_180_032', title: '吳前人蒞臨道一聖道院', date: '951002' },
  { publicId: 'daoyi-web/temples/photo_1767408540933_33_033', title: '新加坡妙星聖堂' },
  { publicId: 'daoyi-web/temples/photo_1767408547121_254_034', title: '妙星聖堂第五間開壇', date: '20130721' },
  { publicId: 'daoyi-web/temples/photo_1767408554556_270_035', title: '妙星聖堂開壇' },
  { publicId: 'daoyi-web/temples/photo_1767408560399_880_036', title: '泰國OA佛堂' },
  { publicId: 'daoyi-web/temples/photo_1767408567718_894_037', title: '泰國OA佛堂' },
  { publicId: 'daoyi-web/temples/photo_1767408569548_223_038', title: '泰國OA佛堂' },
  { publicId: 'daoyi-web/temples/photo_1767408571865_420_039', title: '泰叻拋佛堂', date: '20050313' },
  { publicId: 'daoyi-web/temples/photo_1767408574009_767_040', title: '叻拋佛堂開壇', date: '20050313' },
  { publicId: 'daoyi-web/temples/photo_1767408576376_205_041', title: '泰叻拋佛堂', date: '20050625' },
  { publicId: 'daoyi-web/temples/photo_1767408581748_489_042', title: '泰道一聖道院動土', date: '20050625' },
  { publicId: 'daoyi-web/temples/photo_1767408585721_28_043', title: '道一聖道院合照', date: '20080921' },
  { publicId: 'daoyi-web/temples/photo_1767408589929_273_044', title: '泰國道一聖道院動土' },
  { publicId: 'daoyi-web/temples/photo_1767408594732_816_045', title: '泰道一聖道院動土' },
  { publicId: 'daoyi-web/temples/photo_1767408598015_678_046', title: '曼谷萬緣佛堂開壇', date: '20091101' },
  { publicId: 'daoyi-web/temples/photo_1767408602558_405_047', title: '泰萬緣佛堂開壇', date: '20091101' },
  { publicId: 'daoyi-web/temples/photo_1767408609269_21_048', title: '泰萬緣佛堂開壇剪綵' },
  { publicId: 'daoyi-web/temples/photo_1767408617064_755_049', title: '萬緣佛堂開壇' },
  { publicId: 'daoyi-web/temples/photo_1767408623147_809_050', title: '萬緣佛堂開壇' },
  { publicId: 'daoyi-web/temples/photo_1767408626276_178_051', title: '柬金邊道一萬松佛堂開壇', date: '20141202' },
  { publicId: 'daoyi-web/temples/photo_1767408628182_882_052', title: '柬埔寨道一佛堂', date: '20141202' },
  { publicId: 'daoyi-web/temples/photo_1767408633640_325_053', title: '柬埔寨金邊' },
  { publicId: 'daoyi-web/temples/photo_1767408637392_569_054', title: '道一東山聖堂', date: '901202' },
  { publicId: 'daoyi-web/temples/photo_1767408639828_308_055', title: '何點傳師領命', date: '961224' },
  { publicId: 'daoyi-web/temples/photo_1767408643363_518_056', title: '道一東山聖堂', date: '901202' },
  { publicId: 'daoyi-web/temples/photo_1767408646461_359_057', title: '東山聖堂', date: '20031122' },
  { publicId: 'daoyi-web/temples/photo_1767408649125_705_058', title: '東山聖堂', date: '20031127' },
  { publicId: 'daoyi-web/temples/photo_1767408651080_702_059', title: '顏點傳師領命', date: '20020921' },
];

/**
 * 取得所有佛堂照片的 public IDs
 */
export function getTemplePhotoIds(): string[] {
  return TEMPLE_PHOTOS.map(photo => photo.publicId);
}

/**
 * 取得隨機佛堂照片
 */
export function getRandomTemplePhotos(count: number = 10): TemplePhoto[] {
  const shuffled = [...TEMPLE_PHOTOS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
