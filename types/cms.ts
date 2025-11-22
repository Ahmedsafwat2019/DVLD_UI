/**
 * CMS & Marketing Types (Blog, Brand, Feature, Testimonial, Menu)
 */

export interface Author {
  name: string;
  image: string;
  designation: string;
}

export interface Blog {
  id: number;
  title: string;
  paragraph: string;
  image: string;
  author: Author;
  tags: string[];
  publishDate: string;
}

export interface Brand {
  id: number;
  name: string;
  href: string;
  image: string;
  imageLight?: string;
}

export interface Feature {
  id: number;
  icon: string;
  title: string;
  paragraph: string;
}

export interface Testimonial {
  id: number;
  name: string;
  designation: string;
  content: string;
  image: string;
  star: number;
}

export interface Menu {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
}

export interface MenuItem {
  title: string;
  path?: string;
  submenu?: {
    title: string;
    path: string;
  }[];
}
