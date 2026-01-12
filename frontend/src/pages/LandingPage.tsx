import { Link } from "react-router-dom";
import {
  CheckCircle,
  Users,
  FolderKanban,
  Clock,
  MessageSquare,
  LayoutDashboard,
  Shield,
  Star,
  ArrowRight,
  PlayCircle,
  ChartLine,
  BarChart3,
} from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Logo } from "@/components/shared/Logo";
const LandingPage = () => {
  return (
    <div className="bg-white">
      <Navbar variant="landing" />
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center bg-white px-4 py-2 rounded-full mb-6 shadow-lg">
                <ArrowRight className="h-4 w-4 mr-2 text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">
                  Free for 14 days, no credit card required
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Manage tasks with
                <span className="text-purple-400">
                  {" "}
                  real-time collaboration
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                PIVOT helps companies manage projects, track team tasks, and log
                work hours. Built for admins who need control and members who
                need simplicity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-900">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">No credit card required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">14-day free trial</span>
                </div>
              </div>
            </div>
            {/* Right Column - Task Board Preview */}
            <div className="bg-white rounded-xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FolderKanban className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Mobile App v2.0
                    </h3>
                    <p className="text-sm text-gray-500">Project: MOBA</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">12 Team members</p>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white"></div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    98 / 156 tasks
                  </span>
                  <span className="text-green-600 font-semibold">
                    63% complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: "63%" }}
                  ></div>
                </div>
              </div>
              {/* Task Status Columns */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1 font-medium">
                    To Do (43)
                  </p>
                  <div className="space-y-2">
                    <div className="h-12 bg-gray-100 rounded"></div>
                    <div className="h-8 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-blue-600 mb-1 font-medium">
                    In Progress (15)
                  </p>
                  <div className="space-y-2">
                    <div className="h-12 bg-blue-100 rounded"></div>
                    <div className="h-10 bg-blue-100 rounded"></div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-yellow-600 mb-1 font-medium">
                    In Review (8)
                  </p>
                  <div className="space-y-2">
                    <div className="h-10 bg-yellow-100 rounded"></div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-green-600 mb-1 font-medium">
                    Done (98)
                  </p>
                  <div className="space-y-2">
                    <div className="h-12 bg-green-100 rounded"></div>
                    <div className="h-8 bg-green-100 rounded"></div>
                    <div className="h-6 bg-green-100 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">1240h logged</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">65% progress</span>
                  </div>
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-purple-600 font-semibold mb-2 uppercase tracking-wide text-sm">
              FEATURES
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need to manage teams
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete project management platform for companies and teams
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl hover:shadow-xl transition">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <FolderKanban className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Task Management
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Create and assign tasks with priority levels (low, medium,
                high). Track status from To Do → In Progress → In Review → Done.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl hover:shadow-xl transition">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <ChartLine className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Project Organization
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Organize work into projects with unique keys (e.g., MOBA-145).
                Assign teams, set deadlines, and track overall progress.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl hover:shadow-xl transition">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Time Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Built-in timers for every task. Start/stop timers or add manual
                time logs. See total hours per task, project, and team member.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl hover:shadow-xl transition">
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="h-7 w-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Team Collaboration
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Add comments on tasks, upload attachments (PDFs, images), and
                mention team members. Everyone stays in sync.
              </p>
            </div>
            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-xl hover:shadow-xl transition">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <LayoutDashboard className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Member Dashboard
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Members see their assigned tasks, active timers, hours this
                week, and completed work. Simple, focused view.
              </p>
            </div>
            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-xl hover:shadow-xl transition">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Admin Control
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Admins manage company profile, invite members, create projects,
                assign tasks, and view team analytics. Full control.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-purple-600 font-semibold mb-2 uppercase tracking-wide text-sm">
              PRICING
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, scale as you grow
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Perfect for trying out PIVOT
              </p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">₹0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  5 users max
                </li>
                <li className="flex items-start text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  3 projects max
                </li>
                <li className="flex items-start text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  5 GB storage
                </li>
                <li className="flex items-start text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Community support
                </li>
              </ul>
              <Link
                to="/signup"
                className="block w-full bg-gray-100 text-gray-900 py-3 rounded-xl text-center font-semibold hover:bg-gray-200 text-sm"
              >
                Get Started
              </Link>
            </div>
            {/* Starter Plan */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 mb-6 text-sm">For small teams</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">₹99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  15 users max
                </li>
                <li className="flex items-start text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  10 projects max
                </li>
                <li className="flex items-start text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  20 GB storage
                </li>
                <li className="flex items-start text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Email support
                </li>
                <li className="flex items-start text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Custom fields
                </li>
              </ul>
              <Link
                to="/signup"
                className="block w-full bg-purple-100 text-purple-900 py-3 rounded-xl text-center font-semibold hover:bg-purple-200 text-sm"
              >
                Start Trial
              </Link>
            </div>
            {/* Professional Plan (Popular) */}
            <div className="bg-purple-600 rounded-2xl p-6 transform scale-105 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">Professional</h3>
                <span className="bg-white text-purple-900 px-3 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </span>
              </div>
              <p className="text-purple-100 mb-6 text-sm">For growing teams</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">₹499</span>
                <span className="text-purple-100">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-white text-sm">
                  <CheckCircle className="h-4 w-4 text-yellow-300 mr-2 mt-0.5 flex-shrink-0" />
                  50 users max
                </li>
                <li className="flex items-start text-white text-sm">
                  <CheckCircle className="h-4 w-4 text-yellow-300 mr-2 mt-0.5 flex-shrink-0" />
                  50 projects max
                </li>
                <li className="flex items-start text-white text-sm">
                  <CheckCircle className="h-4 w-4 text-yellow-300 mr-2 mt-0.5 flex-shrink-0" />
                  100 GB storage
                </li>
                <li className="flex items-start text-white text-sm">
                  <CheckCircle className="h-4 w-4 text-yellow-300 mr-2 mt-0.5 flex-shrink-0" />
                  Priority support
                </li>
                <li className="flex items-start text-white text-sm">
                  <CheckCircle className="h-4 w-4 text-yellow-300 mr-2 mt-0.5 flex-shrink-0" />
                  Advanced reports & API
                </li>
              </ul>
              <Link
                to="/signup"
                className="block w-full bg-white text-purple-600 py-3 rounded-xl text-center font-semibold hover:bg-gray-50 text-sm"
              >
                Start Free Trial
              </Link>
            </div>
            {/* Enterprise Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Enterprise
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                For large organizations
              </p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">₹999</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Unlimited users
                </li>
                <li className="flex items-start text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Unlimited projects
                </li>
                <li className="flex items-start text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Unlimited storage
                </li>
                <li className="flex items-start text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Dedicated support
                </li>
                <li className="flex items-start text-gray-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  SSO & custom domain
                </li>
              </ul>
              <Link
                to="/signup"
                className="block w-full bg-gray-100 text-gray-900 py-3 rounded-xl text-center font-semibold hover:bg-gray-200 text-sm"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-purple-600 font-semibold mb-2 uppercase tracking-wide text-sm">
              TESTIMONIALS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Loved by teams
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Kumar",
                role: "CTO, TechCorp Inc.",
                text: "The task tracking is perfect. We can see exactly who's working on what, and the time logs help us stay on budget.",
                initials: "RK",
                color: "purple",
              },
              {
                name: "Sarah Kim",
                role: "Project Manager, BuildCo",
                text: "PIVOT made project management simple. Our team loves the dashboard and the notifications keep everyone updated.",
                initials: "SK",
                color: "blue",
              },
              {
                name: "Mike Ross",
                role: "Developer, StartupXYZ",
                text: "Finally, a tool that lets me track my time easily. The timer feature is brilliant and automatic time logs save me hours.",
                initials: "MR",
                color: "green",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 bg-${testimonial.color}-100 rounded-full flex items-center justify-center mr-3`}
                  >
                    <span className={`text-${testimonial.color}-600 font-bold`}>
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start managing your team today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join companies already using PIVOT to manage projects and track team
            progress
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 text-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-900 text-lg">
              Schedule Demo
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Logo size="md" showText={false} variant="light" />
                <span className="text-xl font-bold text-white">PIVOT</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-sm">
                Complete project and task management platform for companies and
                teams.
              </p>
              <p className="text-sm text-gray-500">
                © 2026 PIVOT. All rights reserved.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Updates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              Built for teams who value simplicity
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <Users className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <ChartLine className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
