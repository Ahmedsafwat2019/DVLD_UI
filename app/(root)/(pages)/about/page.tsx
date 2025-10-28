import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheckIcon,
  UsersIcon,
  ClockIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  StarIcon,
  GlobeIcon,
  AwardIcon,
} from "@/components/ui/icons/lucide";
import { achievements, stats, team, values } from "@/constants";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="outline"
              className="mb-4 text-blue-600 border-blue-600"
            >
              عن بوابة مرور مصر
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              رؤيتنا لمستقبل أفضل
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              بوابة مرور مصر الرسمية - نعمل على تطوير وتحسين الخدمات المرورية
              لتوفير تجربة سهلة وآمنة لجميع المواطنين والمقيمين في جمهورية مصر
              العربية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                تعرف على خدماتنا
              </Button>
              <Button variant="outline" size="lg">
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <GlobeIcon />
                  </div>
                  رؤيتنا
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-lg">
                  أن نكون البوابة الرقمية الرائدة في تقديم الخدمات المرورية
                  المتميزة، وأن نكون نموذجاً يحتذى به في التحول الرقمي للخدمات
                  الحكومية في المنطقة العربية.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <AwardIcon />
                  </div>
                  رسالتنا
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-lg">
                  تقديم خدمات مرورية عالية الجودة وسهلة الاستخدام، مع ضمان
                  الأمان والموثوقية، لتحسين تجربة المواطنين وتسهيل إجراءاتهم
                  اليومية.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              قيمنا الأساسية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نؤمن بقيم أساسية توجه عملنا وتشكل هويتنا المؤسسية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-blue-100 rounded-full text-blue-600">
                      {value.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      {/* <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              إنجازاتنا ونجاحاتنا
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              نحتفل بالإنجازات التي حققناها في رحلة التطوير والتحسين المستمر
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <StarIcon className="w-6 h-6 text-yellow-300" />
                    </div>
                  </div>
                  <div>
                    <div className="text-yellow-300 font-semibold mb-2">
                      {achievement.year}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {achievement.title}
                    </h3>
                    <p className="opacity-90">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              فريق العمل المتميز
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نخبة من الخبراء والمتخصصين يعملون بجد لخدمتكم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-linear-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.split(" ")[0].charAt(0)}
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {member.position}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm text-center">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-blue-50 to-purple-50 ">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              انضم إلى رحلتنا نحو المستقبل
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              نحن ملتزمون بتقديم أفضل الخدمات المرورية. تواصل معنا لمعرفة المزيد
              عن خدماتنا أو لتقديم اقتراحاتك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                ابدأ الآن
              </Button>
              <Button variant="outline" size="lg">
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
