export const translations = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.gallery': 'Gallery',
    'nav.bio': 'Biography',
    'nav.contact': 'Contact',

    // Landing
    'landing.tagline': 'Animals in Clay, in the Xieyi Tradition',
    'landing.intro': 'Combining a wide range of clay bodies and techniques to render natural, innocent, and earthy forms — animal subjects in the freehand spirit of Chinese xieyi painting.',
    'landing.viewGallery': 'View Gallery',
    'landing.getInTouch': 'Get in Touch',
    'landing.featuredWorks': 'Featured Works',

    // Gallery
    'gallery.title': 'Gallery',
    'gallery.filterAnimal': 'Animal',
    'gallery.filterYear': 'Year',
    'gallery.filterType': 'Type',
    'gallery.all': 'All',
    'gallery.original': 'Original',
    'gallery.copy': 'Limited Edition',
    'gallery.noResults': 'No works match the selected filters.',

    // Work detail
    'work.year': 'Year',
    'work.material': 'Material',
    'work.dimensions': 'Dimensions',
    'work.type': 'Type',
    'work.price': 'Price',
    'work.inquire': 'Inquire',
    'work.original': 'Original',
    'work.copy': 'Limited Edition',
    'work.relatedWorks': 'Related Works',

    // Bio
    'bio.title': 'Biography',
    'bio.statement': 'Artist Statement',
    'bio.exhibitions': 'Exhibitions',
    'bio.awards': 'Awards',

    // Contact
    'contact.title': 'Contact',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.subjectInquiry': 'Inquiry',
    'contact.subjectCommission': 'Commission',
    'contact.subjectGeneral': 'General',

    // Footer
    'footer.rights': 'All rights reserved.',
  },
  zh: {
    // Nav
    'nav.home': '首页',
    'nav.gallery': '作品集',
    'nav.bio': '艺术家简介',
    'nav.contact': '联系方式',

    // Landing
    'landing.tagline': '泥火生灵 · 大写意陶瓷雕塑',
    'landing.intro': '运用诸多技法综合各种泥料，以动物为题材，展现自然、纯真、质朴的艺术形象与大写意的艺术风格。',
    'landing.viewGallery': '浏览作品',
    'landing.getInTouch': '联系我们',
    'landing.featuredWorks': '精选作品',

    // Gallery
    'gallery.title': '作品集',
    'gallery.filterAnimal': '动物',
    'gallery.filterYear': '年份',
    'gallery.filterType': '类型',
    'gallery.all': '全部',
    'gallery.original': '原作',
    'gallery.copy': '限量版',
    'gallery.noResults': '没有符合筛选条件的作品。',

    // Work detail
    'work.year': '年份',
    'work.material': '材质',
    'work.dimensions': '尺寸',
    'work.type': '类型',
    'work.price': '价格',
    'work.inquire': '询价',
    'work.original': '原作',
    'work.copy': '限量版',
    'work.relatedWorks': '相关作品',

    // Bio
    'bio.title': '艺术家简介',
    'bio.statement': '艺术宣言',
    'bio.exhibitions': '展览',
    'bio.awards': '奖项',

    // Contact
    'contact.title': '联系方式',
    'contact.name': '姓名',
    'contact.email': '邮箱',
    'contact.subject': '主题',
    'contact.message': '留言',
    'contact.send': '发送消息',
    'contact.subjectInquiry': '咨询',
    'contact.subjectCommission': '委托创作',
    'contact.subjectGeneral': '一般咨询',

    // Footer
    'footer.rights': '版权所有。',
  },
} as const;

export type Lang = keyof typeof translations;
export type TranslationKey = keyof typeof translations['en'];

export function getLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  return (localStorage.getItem('lang') as Lang) || 'en';
}

export function t(key: TranslationKey, lang?: Lang): string {
  const l = lang || getLang();
  return translations[l][key] || translations['en'][key] || key;
}
