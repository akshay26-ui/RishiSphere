// /src/data/mockData.js
import {
  Award,
  Bell,
  CalendarDays,
  CircleUserRound,
  Clock3,
  Compass,
  Home,
  Medal,
  Music,
  Settings,
  Sparkles,
  UsersRound,
} from "lucide-react";

export const navLinks = [
  { label: "Calendar", path: "/calendar" },
  { label: "My Club", path: "/admin" },
  { label: "Explore", path: "/" },
  { label: "Certificates", path: "/admin" },
];

export const adminNav = [
  { label: "Overview", icon: Home, badge: null },
  { label: "Pending Approvals", icon: Clock3, badge: 12 },
  { label: "All Events", icon: CalendarDays, badge: null },
  { label: "Clubs", icon: UsersRound, badge: null },
  { label: "Members", icon: CircleUserRound, badge: null },
  { label: "Certificates", icon: Medal, badge: null },
  { label: "Settings", icon: Settings, badge: null },
];

export const myEvents = [
  { title: "Design Thinking Boo...", date: "May 10 • 10:00 AM", status: "Enrolled", tone: "rishi" },
  { title: "Student Web3 Meetup", date: "May 14 • 4:00 PM", status: "Pending", tone: "amber" },
  { title: "Hackathon Kickoff", date: "May 18 • 9:00 AM", status: "Approved", tone: "green" },
  { title: "Gaming Night", date: "May 20 • 8:00 PM", status: "Rejected", tone: "red" },
];

export const filters = [
  "Official Events",
  "Club Events",
  "Workshops",
  "Guest Lectures",
  "Cultural & Informal",
];

export const events = [
  {
    id: 1,
    title: "Design Thinking Bootcamp",
    short: "Design T...",
    day: 10,
    date: "Saturday, 10 May 2026",
    time: "10:00 AM — 1:00 PM",
    duration: "3 hours",
    venue: "A-401",
    venueMeta: "Block A • Fourth Floor • Rishihood University",
    seats: 43,
    capacity: 60,
    type: "Official Event",
    color: "rishi",
    description:
      "A 3-hour intensive workshop covering the fundamentals of user-centered design and rapid prototyping.",
    host: "Student Affairs",
    hostMeta: "Rishihood University",
    conflict: "Conflicts with User Research 101 · 11:00–12:30 PM",
  },
  { id: 2, title: "Industry Talk", short: "Industry Ta...", day: 4, time: "2:00 PM", venue: "Auditorium", type: "Guest Lectures", color: "outline" },
  { id: 3, title: "Finance Club", short: "Finance Clu...", day: 8, time: "5:00 PM", venue: "C-103", type: "Club Events", color: "dark" },
  { id: 4, title: "Robotics Workshop", short: "Robotics We...", day: 12, time: "11:00 AM", venue: "Lab 2", type: "Workshops", color: "dark" },
  { id: 5, title: "Open Mic Night", short: "Open Mic Ni...", day: 15, time: "6:00 PM", venue: "Cafeteria", type: "Cultural & Informal", color: "peach" },
  { id: 6, title: "Hackathon Kickoff", short: "Hackathon ...", day: 18, time: "9:00 AM", venue: "Auditorium", type: "Club Events", color: "rishi" },
  { id: 7, title: "Townhall Meet", short: "Townhall M...", day: 22, time: "4:00 PM", venue: "Main Audi", type: "Official Events", color: "rishi" },
  { id: 8, title: "Resume Builder", short: "Resume Buil...", day: 26, time: "3:00 PM", venue: "C-201", type: "Workshops", color: "outline" },
  { id: 9, title: "Movie Screening", short: "Movie Scree...", day: 28, time: "7:30 PM", venue: "Auditorium", type: "Cultural & Informal", color: "peach" },
];

export const stats = [
  { label: "Total Events This Month", value: "142", change: "↗ 12%", helper: "vs last month" },
  { label: "Pending Approvals", value: "12", change: "− 2", helper: "since yesterday" },
  { label: "Total Enrolled Students", value: "845", change: "↗ 5%", helper: "vs last month" },
  { label: "Certificates Issued", value: "1,204", change: "↗ 24%", helper: "vs last month" },
];

export const approvals = [
  { title: "Design Thinking Bootcamp", submitter: "Aryan Mehta", date: "May 10, 10:00 AM", place: "Block A, 4th Floor", icon: Sparkles },
  { title: "AI & Ethics Panel", submitter: "Tech Club", date: "May 12, 2:00 PM", place: "Auditorium", icon: Award },
  { title: "Annual Cultural Night", submitter: "Cultural Committee", date: "May 15, 6:00 PM", place: "Open Ground", icon: Music },
];

export const activities = [
  { text: "Design Club published a new event: Open Mic Night", time: "2 hours ago", color: "rishi" },
  { text: "Arjun Mehta submitted AI Workshop for approval", time: "5 hours ago", color: "gray" },
  { text: "You approved Guest Lecture: Future of Tech", time: "Yesterday at 4:30 PM", color: "green" },
  { text: "Certificates were automatically issued for Web Dev 101 (42 attendees)", time: "Yesterday at 11:00 AM", color: "green" },
];

export const eventTypes = [
  { label: "Workshop", note: "hands-on learning session", icon: Sparkles },
  { label: "Guest Talk", note: "speaker or panel event", icon: Bell },
  { label: "Social", note: "informal club meetup or hangout", icon: UsersRound },
  { label: "Cultural", note: "performance, showcase, or celebration", icon: Music },
  { label: "Hackathon", note: "competitive build sprint", icon: Compass },
  { label: "Other", note: "anything that does not fit above", icon: CalendarDays },
];
