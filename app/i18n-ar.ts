import type {SystemId} from './anatomy';

/** Arabic names and descriptions for the 15 display systems. */
export const SYSTEMS_AR: Record<SystemId,{name:string;description:string}> = {
 skeletal:{name:'الهيكل العظمي',description:'تشكّل العظام الإطار الداعم للجسم، وتحمي الأعضاء، وتوفّر نقاط ارتكاز للعضلات. ويخزّن نسيجها الداخلي المعادن وينتج خلايا الدم.'},
 muscular:{name:'العضلات',description:'تولّد العضلات الهيكلية الحركة بشدّ نقاط ارتكازها. وتعمل مع الأوتار على تحريك المفاصل وتثبيت القوام وإنتاج الحرارة.'},
 cardiac:{name:'القلب',description:'القلب مضخة عضلية من أربع حجرات. توجّه صماماته الدم إلى الأمام عبر الدورتين الرئوية والجهازية.'},
 sensory:{name:'أعضاء الحس',description:'تسهم هذه البنى في الحواس الخاصة كالبصر والسمع والتوازن. تلتقط أنسجتها المتخصصة المنبّهات وتنقلها عبر الجهاز العصبي.'},
 arterial:{name:'الشرايين',description:'يضخ القلب الدم في الدورة الدموية. تحمل الشرايين الدم بعيداً عن القلب لتغذية الأنسجة، أو إلى الرئتين في الدورة الرئوية.'},
 venous:{name:'الأوردة',description:'تعيد الأوردة الدم نحو القلب. تجمع الشبكات السطحية والعميقة الدم من الأنسجة، وتعيد الأوردة الرئوية الدم المؤكسج من الرئتين.'},
 nervous:{name:'الجهاز العصبي',description:'يحمل الدماغ والحبل الشوكي والأعصاب المحيطية الإشارات ويعالجها، فتدعم الإحساس والحركة والتنسيق والتنظيم التلقائي لوظائف الجسم.'},
 respiratory:{name:'الجهاز التنفسي',description:'توصل المسالك الهوائية الهواء إلى الرئتين، حيث ينتقل الأكسجين وثاني أكسيد الكربون بين الهواء والدم بفعل تغيّر الضغط الذي تحدثه عضلات التنفس.'},
 digestive:{name:'الجهاز الهضمي',description:'يفكك السبيل الهضمي الطعام ويمتص المغذيات والماء ويدفع الفضلات إلى الأمام، وتسهم الأعضاء الملحقة بالصفراء والإنزيمات الهاضمة.'},
 urinary:{name:'الجهاز البولي',description:'ترشّح الكليتان الدم وتنظّمان توازن السوائل والأملاح والحموضة. ينتقل البول عبر الحالبين إلى المثانة ويخرج عبر الإحليل.'},
 lymphatic:{name:'الجهاز اللمفاوي',description:'تعيد الأوعية اللمفاوية السائل الزائد من الأنسجة إلى الدورة الدموية، وتدعم العقد اللمفاوية والأعضاء اللمفاوية المراقبة المناعية.'},
 endocrine:{name:'الغدد الصماء',description:'تفرز الغدد الصماء الهرمونات في الدم لتنسيق عمليات مثل الاستقلاب والنمو والاستجابة للإجهاد والتكاثر.'},
 reproductive:{name:'الجهاز التناسلي',description:'تسهم البنى التناسلية الذكرية الممثلة هنا في إنتاج النطاف ونضجها ونقلها وفي إنتاج الهرمونات الجنسية.'},
 integumentary:{name:'سطح الجسم',description:'يوفّر سطح الجسم مرجعاً تشريحياً خارجياً. يشكّل الجهاز الجلدي حاجزاً واقياً ويسهم في الإحساس وتنظيم الحرارة.'},
 connective:{name:'النسيج الضام',description:'تدعم الغضاريف والأربطة والأنسجة الضامة الأخرى البنى وتربطها وتفصل بينها، وتثبّت المفاصل وتوزّع الأحمال الميكانيكية.'},
};

/** Short Arabic explanations for individual organs, keyed by lowercase English name. */
export const EXPLANATIONS_AR: Record<string,string> = {
 'heart':'مضخة عضلية في الصدر. يرسل جانبها الأيمن الدم إلى الرئتين، ويرسل جانبها الأيسر الدم عبر الدورة الجهازية.',
 'liver':'عضو كبير تحت الجانب الأيمن من الحجاب الحاجز. يعالج المغذيات الممتصة، وينتج الصفراء، ويصنّع كثيراً من بروتينات الدم.',
 'brain':'العضو المركزي في الجهاز العصبي. تدعم مناطقه المترابطة الإدراك والحركة والذاكرة واللغة وتنظيم وظائف الجسم.',
 'stomach':'حجرة عضلية بين المريء والأمعاء الدقيقة، تخزّن الطعام وتمزجه بالحمض والإنزيمات قبل تمريره إلى الاثني عشر.',
 'spleen':'عضو لمفاوي في أعلى البطن من الجهة اليسرى، يرشّح الدم ويزيل خلايا الدم الهرمة ويشارك في الاستجابات المناعية.',
 'pancreas':'عضو بطني له دور هضمي وصمّاوي، يزوّد الأمعاء الدقيقة بالإنزيمات ويفرز هرمونات منها الإنسولين والغلوكاغون.',
 'urinary bladder':'مستودع عضلي في الحوض يخزّن البول القادم من الكليتين عبر الحالبين.',
 'trachea':'المجرى الهوائي الرئيس الذي يصل الحنجرة بالقصبات، وتحافظ حلقاته الغضروفية على انفتاحه أثناء التنفس.',
 'diaphragm':'عضلة عريضة تفصل الصدر عن البطن. عند انقباضها يزداد حجم الصدر فيدخل الهواء إلى الرئتين.',
 'kidney':'عضو على شكل حبة الفاصولياء خلف البطن، يرشّح الدم وينتج البول وينظّم السوائل والأملاح وضغط الدم.',
 'lung':'عضو التنفس في الصدر، يتم فيه تبادل الأكسجين وثاني أكسيد الكربون بين الهواء والدم في الأسناخ.',
 'esophagus':'أنبوب عضلي ينقل الطعام من البلعوم إلى المعدة بحركات تمعّجية.',
 'gallbladder':'كيس صغير تحت الكبد يخزّن الصفراء ويركّزها ثم يفرغها في الاثني عشر عند الهضم.',
 'spinal cord':'حزمة عصبية داخل القناة الفقرية تنقل الإشارات بين الدماغ والجسم وتتحكم في المنعكسات.',
 'femur':'عظم الفخذ، وهو أطول عظام الجسم وأقواها، يصل الورك بالركبة.',
 'skull':'الجمجمة: مجموعة عظام تحمي الدماغ وتدعم بنى الوجه.',
 'aorta':'الأبهر: أكبر شريان في الجسم، يخرج من البطين الأيسر ويوزّع الدم المؤكسج على الدورة الجهازية.',
 'thyroid gland':'غدة في مقدمة العنق تفرز هرمونات تنظّم الاستقلاب والنمو.',
 'adrenal gland':'غدة فوق كل كلية تفرز هرمونات منها الكورتيزول والأدرينالين.',
 'prostate':'غدة تحت المثانة عند الذكر تفرز جزءاً من السائل المنوي.',
};

/** Arabic names for common structures, keyed by lowercase English name. */
export const NAMES_AR: Record<string,string> = {
 'heart':'القلب','brain':'الدماغ','liver':'الكبد','stomach':'المعدة','spleen':'الطحال','pancreas':'البنكرياس','urinary bladder':'المثانة البولية','trachea':'الرغامى (القصبة الهوائية)','diaphragm':'الحجاب الحاجز','kidney':'الكلية','left kidney':'الكلية اليسرى','right kidney':'الكلية اليمنى','lung':'الرئة','left lung':'الرئة اليسرى','right lung':'الرئة اليمنى','esophagus':'المريء','gallbladder':'المرارة','spinal cord':'الحبل الشوكي','cerebellum':'المخيخ','brainstem':'جذع الدماغ','midbrain':'الدماغ المتوسط','pons':'الجسر','thalamus':'المهاد','hypothalamus':'الوطاء (تحت المهاد)','hippocampus':'الحُصين','amygdala':'اللوزة الدماغية','pineal body':'الغدة الصنوبرية','optic nerve':'العصب البصري','optic chiasm':'التصالب البصري','cranial nerve':'عصب قحفي','nerve':'عصب','ganglion':'عقدة عصبية',
 'skull':'الجمجمة','mandible':'الفك السفلي','maxilla':'الفك العلوي','frontal bone':'العظم الجبهي','parietal bone':'العظم الجداري','temporal bone':'العظم الصدغي','occipital bone':'العظم القذالي','sphenoid bone':'العظم الوتدي','ethmoid':'العظم الغربالي','nasal bone':'العظم الأنفي','hyoid bone':'العظم اللامي','vertebra':'فقرة','atlas':'الفهقة (الفقرة العنقية الأولى)','axis':'المحور (الفقرة العنقية الثانية)','sacrum':'العجز','rib':'ضلع','rib cage':'القفص الصدري','sternum':'عظم القص','manubrium':'قبضة القص','clavicle':'الترقوة','scapula':'لوح الكتف','humerus':'عظم العضد','radius':'الكعبرة','ulna':'الزند','carpal bone':'عظم رسغي','scaphoid':'العظم الزورقي','lunate':'العظم الهلالي','hip bone':'عظم الورك','pelvis':'الحوض','bony pelvis':'الحوض العظمي','femur':'عظم الفخذ','patella':'الرضفة (صابونة الركبة)','tibia':'الظنبوب','fibula':'الشظية','talus':'الكاحل (القعب)','calcaneus':'عظم العقب','tooth':'سن','molar tooth':'ضرس','incisor tooth':'سن قاطع','canine tooth':'ناب',
 'aorta':'الأبهر','arch of aorta':'قوس الأبهر','artery':'شريان','vein':'وريد','portal vein':'الوريد البابي','femoral artery':'الشريان الفخذي','femoral vein':'الوريد الفخذي','renal artery':'الشريان الكلوي','renal vein':'الوريد الكلوي','celiac trunk':'الجذع البطني','azygos vein':'الوريد الفرد','hepatic vein':'الوريد الكبدي','splenic vein':'الوريد الطحالي','cephalic vein':'الوريد الرأسي','basilic vein':'الوريد القاعدي','radial artery':'الشريان الكعبري','ulnar artery':'الشريان الزندي','left atrium':'الأذين الأيسر','right atrium':'الأذين الأيمن','left ventricle':'البطين الأيسر','right ventricle':'البطين الأيمن','aortic valve':'الصمام الأبهري','mitral valve':'الصمام التاجي','tricuspid valve':'الصمام ثلاثي الشرف','pulmonary trunk':'الجذع الرئوي','superior vena cava':'الوريد الأجوف العلوي','inferior vena cava':'الوريد الأجوف السفلي',
 'duodenum':'الاثنا عشر','jejunum':'الصائم','ileum':'اللفائفي','cecum':'الأعور','appendix':'الزائدة الدودية','vermiform appendix':'الزائدة الدودية','colon':'القولون','rectum':'المستقيم','small intestine':'الأمعاء الدقيقة','large intestine':'الأمعاء الغليظة','tongue':'اللسان','pharynx':'البلعوم','larynx':'الحنجرة','epiglottis':'لسان المزمار','bronchus':'قصبة','main bronchus':'القصبة الرئيسية','bile duct':'القناة الصفراوية','cystic duct':'القناة المرارية','peritoneum':'الصفاق (البريتون)','mediastinum':'المنصف',
 'ureter':'الحالب','urethra':'الإحليل','testis':'الخصية','epididymis':'البربخ','deferent duct':'الأسهر','prostate':'البروستاتا','thyroid gland':'الغدة الدرقية','adrenal gland':'الغدة الكظرية','thymus':'الغدة الزعترية (التوتة)','lymph node':'عقدة لمفاوية',
 'eyeball':'مقلة العين','left eyeball':'مقلة العين اليسرى','right eyeball':'مقلة العين اليمنى','cornea':'القرنية','lens':'العدسة','iris':'القزحية','sclera':'الصلبة','choroid':'المشيمية','vitreous body':'الجسم الزجاجي','external ear':'الأذن الخارجية','nose':'الأنف','external nose':'الأنف الخارجي','nasal septum':'الحاجز الأنفي','skin':'الجلد','hair':'الشعر',
 'biceps brachii':'العضلة ذات الرأسين العضدية','triceps brachii':'العضلة ثلاثية الرؤوس العضدية','deltoid':'العضلة الدالية','pectoralis major':'العضلة الصدرية الكبرى','trapezius':'العضلة شبه المنحرفة','latissimus dorsi':'العضلة الظهرية العريضة','rectus abdominis':'العضلة المستقيمة البطنية','gluteus maximus':'العضلة الألوية الكبرى','quadriceps femoris':'العضلة رباعية الرؤوس الفخذية','sartorius':'العضلة الخياطية','gracilis':'العضلة الناحلة','soleus':'العضلة النعلية','gastrocnemius':'العضلة التوأمية الساقية','platysma':'العضلة الجلدية العنقية','sternocleidomastoid':'العضلة القصية الترقوية الخشائية','masseter':'العضلة الماضغة','temporalis':'العضلة الصدغية','psoas major':'العضلة القطنية الكبيرة','iliacus':'العضلة الحرقفية','supraspinatus':'العضلة فوق الشوكة','infraspinatus':'العضلة تحت الشوكة','subscapularis':'العضلة تحت الكتف','teres major':'العضلة المدورة الكبيرة','teres minor':'العضلة المدورة الصغيرة','brachialis':'العضلة العضدية','tendon':'وتر',
 'head':'الرأس','neck':'العنق','face':'الوجه','thorax':'الصدر','abdomen':'البطن','trunk':'الجذع','left arm':'الذراع اليسرى','right arm':'الذراع اليمنى','left leg':'الساق اليسرى','right leg':'الساق اليمنى','left hand':'اليد اليسرى','right hand':'اليد اليمنى','left foot':'القدم اليسرى','right foot':'القدم اليمنى','human body':'جسم الإنسان','lower limb':'الطرف السفلي','upper limb':'الطرف العلوي',
};

const SIDE:[RegExp,string][] = [[/^left /,'يسار'],[/^right /,'يمين']];
/** Arabic name for an English structure name, or '' when none is known.
 * "left X"/"right X" without its own entry becomes "<X> (يسار|يمين)" to avoid gender-agreement mistakes. */
export function arabicName(name:string):string{
 const key=name.toLowerCase().trim();
 if(NAMES_AR[key])return NAMES_AR[key];
 for(const [re,side] of SIDE){
  if(re.test(key)){const base=NAMES_AR[key.replace(re,'')];if(base)return `${base} (${side})`;}
 }
 return '';
}

/** Normalise Arabic text for search: strip diacritics/tatweel and unify alef, yaa and taa marbuta forms. */
export function normalizeArabic(text:string):string{
 return text.toLowerCase().replace(/[ً-ْـ]/g,'').replace(/[إأآا]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/^ال/,'').replace(/\s+ال/g,' ').trim();
}
