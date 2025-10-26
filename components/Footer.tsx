import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { navLinks, services } from "@/constants";
import { MessageCircleMoreIcon } from "./ui/icons/lucide-message-circle-more";
import { TwitterIcon } from "./ui/icons/lucide-twitter";
import { FacebookIcon } from "./ui/icons/lucide-facebook";

const Footer = () => {
  return (
    <footer className="bg-dark-gray text-white-text">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 ">
              <span className="text-xl font-bold">شعار</span>
            </div>
            <p className="text-text-300 text-sm leading-relaxed">
              بوابة مرور مصر الرسمية - نقدم أفضل الخدمات الإلكترونية للمواطنين
              والمقيمين في جمهورية مصر العربية
            </p>
            <div className="flex space-x-4 ">
              <Button size="icon-sm">
                <FacebookIcon />
              </Button>
              <Button size="icon-sm">
                <TwitterIcon />
              </Button>
              <Button size="icon-sm">
                <MessageCircleMoreIcon />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">روابط سريعة</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li>
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-text-300 hover:text-white-text transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">خدماتنا</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li>
                  <Link
                    href={service.href}
                    className="text-text-300 hover:text-white-text transition-colors duration-200"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">معلومات التواصل</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 ">
                <svg
                  className="h-5 w-5 text-blue-400 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="text-text-300 text-sm">القاهرة، مصر</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 ">
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <p className="text-text-300 text-sm">+20 2 1234 5678</p>
              </div>

              <div className="flex items-center space-x-3 ">
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-text-300 text-sm">info@traffic.gov.eg</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">
              اشترك في النشرة الإخبارية
            </h3>
            <p className="text-text-300 text-sm mb-4">
              احصل على آخر الأخبار والتحديثات حول خدمات المرور
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button variant="default" size="default">
                اشترك
              </Button>
            </div>
          </div>
        </div>*/}
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-text-400 text-sm">
              © 2025 بوابة مرور مصر. جميع الحقوق محفوظة.
            </div>
            <div className="flex space-x-6 ">
              <Link
                href="/privacy"
                className="text-text-400 hover:text-white-text text-sm transition-colors duration-200"
              >
                سياسة الخصوصية
              </Link>
              <Link
                href="/terms"
                className="text-text-400 hover:text-white-text text-sm transition-colors duration-200"
              >
                شروط الاستخدام
              </Link>
              <Link
                href="/cookies"
                className="text-text-400 hover:text-white-text text-sm transition-colors duration-200"
              >
                ملفات تعريف الارتباط
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
