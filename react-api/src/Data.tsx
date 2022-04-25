export const data: Dataset[] = [
  {
    id: 1,
    image: '/images/1.jpg',
    title: 'Ростовский центр туристических путевок',
    author: 'Vladimir Strogonov',
    description:
      'Разработка централизовнной платформы для создания и дистрибуции туристских продуктов в формате путевок. Требуются: веб-девелоперы, организаторы тур-предложений, рекламисты и пиарщики',
    open: false,
    selected: false,
  },
  {
    id: 2,
    image: '/images/2.jpg',
    title: 'Туристское агентство "Jorney"',
    author: 'Valeria Zeverskaya',
    description:
      'Создание плана туристского агенства для дальнейшего питча инвесторам. Требуются: дизайнеры, экономисты, рекламисты и пиарщики',
    open: true,
    selected: false,
  },
  {
    id: 3,
    image: '/images/3.jpg',
    title: 'Туристический журнал "Мироходец"',
    author: 'Solid Snake',
    description:
      'Разработка туристического журнала о гостиничных сетях, местах интереса и турах внутреннего и внешнего туризма. Требуются: дизайнеры, фотографы, журналисты, рекламисты',
    open: true,
    selected: false,
  },
  {
    id: 4,
    image: '/images/4.jpg',
    title: 'Исследование инклюзивного туризма Ростовской области',
    author: 'Milana Ivashenko',
    description:
      'Проведение крупномасштабного исследования в области инклюзивного туризма на территории РО. Требуются: аналитики, сборщики данных, фотографы',
    open: true,
    selected: false,
  },
  {
    id: 5,
    image: '/images/5.jpg',
    title: 'Создание правовой книги-памятки в сфере туризма',
    author: 'Alexei Marchenko',
    description:
      'Составление всеобемлющей доступной и понятной памятки прав и обязанностей туриста на основе правового кодекса РФ. Требуются: юристы, дизайнеры, журналисты',
    open: true,
    selected: false,
  },
  {
    id: 6,
    image: '/images/6.jpg',
    title: 'Создание тура "Донское казачество"',
    author: 'Matvei Platov',
    description:
      'Разработка тура по Ростовской области, посвященного казачьим достопримечательностям региона. Требуются: организаторы тур-предложений, журналисты, рекламисты ',
    open: true,
    selected: false,
  },
];

export interface Dataset {
  id: number;
  image: string;
  title: string;
  author: string;
  description: string;
  open: boolean;
  selected: boolean;
}
