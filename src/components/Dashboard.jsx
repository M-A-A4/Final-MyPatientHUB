
import React from "react";
import Footer from "./Footer";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import "./Dashboard.css";

const clinicData = [
  { name: "Klinik Lee Healthcare", value: 19 },
  { name: "Klinik Bandar Baru Nilai", value: 4 },
  { name: "Klinik Mediviron Giant Nilai", value: 10 },
  { name: "Klinik Nilai Impian", value: 21 },
  { name: "Klinik Mediviron", value: 2 },
];

const pharmacyData = [
  { name: "ALPRO Pharmacy Nilai", value: 15 },
  { name: "ALPRO Pharmacy Pekan Nilai", value: 12 },
  { name: "OK Pharmacy", value: 5 },
  { name: "Pharmart Pharmacy Nilai", value: 9 },
  { name: "Health Lane Family Pharmacy", value: 14 },
];

const marketData = [
  { name: "Food Panda", value: 25 },
  { name: "Grab Food", value: 3 },
  { name: "Zomato", value: 12 },
  { name: "Lazada", value: 7 },
  { name: "Uber Eats", value: 10 },
];

const colors = ["#ff007a", "#2c52ff", "#a9bce0", "#18ae46", "#ffcc32"];

const appointments = [
  {
    name: "Dr. Mustafa",
    type: "Emergency",
    date: "Tuesday, April 5",
    initials: "DM",
  },
  {
    name: "Dr. Khirullah",
    type: "Consultation",
    date: "Friday, November 2",
    initials: "DK",
  },
  {
    name: "Dr. Bilal",
    type: "Examination",
    date: "Monday, March 9",
    initials: "DB",
  },
];

const wellnessData = [
  { year: "2017", Malaria: 90, Cold: 30, Typhoid: 55, Cough: 40 },
  { year: "2018", Malaria: 45, Cold: 65, Typhoid: 35, Cough: 70 },
  { year: "2019", Malaria: 65, Cold: 45, Typhoid: 80, Cough: 50 },
  { year: "2020", Malaria: 35, Cold: 100, Typhoid: 45, Cough: 60 },
  { year: "2021", Malaria: 85, Cold: 55, Typhoid: 30, Cough: 45 },
  { year: "2022", Malaria: 55, Cold: 85, Typhoid: 50, Cough: 35 },
];

const appointmentStats = [
  { month: "Jan", Emergency: 44, Examination: 13, Consultation: 11, Routine: 21 },
  { month: "Feb", Emergency: 55, Examination: 23, Consultation: 17, Routine: 7 },
  { month: "Mar", Emergency: 41, Examination: 20, Consultation: 15, Routine: 25 },
  { month: "Apr", Emergency: 67, Examination: 8, Consultation: 15, Routine: 13 },
  { month: "May", Emergency: 22, Examination: 13, Consultation: 21, Routine: 22 },
  { month: "Jun", Emergency: 43, Examination: 27, Consultation: 14, Routine: 8 },
];

function PromotionCard({ title, data, buttonText = "MORE DETAILS" }) {
  return (
    <article className="dh-card dh-promotion-card">
      <div className="dh-card-heading">
        <h3>{title}</h3>
        <button
          className="dh-info-button"
          title={`Information about ${title}`}
          onClick={() => alert(`${title}: overview of healthcare service statistics.`)}
        >
          i
        </button>
      </div>

      <div className="dh-promotion-content">
        <div className="dh-donut">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="57%"
                outerRadius="98%"
                paddingAngle={1}
                stroke="#fff"
                strokeWidth={1}
                isAnimationActive
                animationBegin={150}
                animationDuration={1400}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="dh-legend-list">
          {data.map((item, index) => (
            <div className="dh-legend-row" key={item.name}>
              <span
                className="dh-legend-dot"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="dh-legend-name">{item.name}</span>
              <span className="dh-legend-value">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <button
        className="dh-details-button"
        onClick={() => alert(`${title} details selected.`)}
      >
        {buttonText}
      </button>
    </article>
  );
}

function TrendCard({ title, value, change, dataKey, data }) {
  return (
    <article className="dh-card dh-trend-card">
      <h3>{title}</h3>
      <div className="dh-trend-value">
        {value} <span>{change}</span>
      </div>
      <div className="dh-trend-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Tooltip />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#394c83"
              strokeWidth={2}
              dot={false}
              isAnimationActive
              animationDuration={1700}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}

function Dashboard() {
  const [period, setPeriod] = React.useState("Days");

  return (
    <div className="dashboard-container dh-dashboard">
      

      <main className="content dh-content">
      

        <div className="dh-page">
          
          <section className="dh-welcome">
            
            <h1>Welcome to MyPatientHUB!</h1>
            <p>Your healthcare overview at a glance.</p>
          </section>

          <section className="dh-promotion-grid">
            <PromotionCard title="Promotion by Clinics" data={clinicData} />
            <PromotionCard title="Promotion by Pharmacies" data={pharmacyData} />

            <PromotionCard
              title="Smart Market Usage by App"
              data={marketData}
            />

            <article className="dh-card dh-health-index">
              <h3>Health Index</h3>
              <div className="dh-index-number">
                70% <span>+3%</span>
              </div>

              <div className="dh-health-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { day: "1", health: 45 },
                      { day: "2", health: 52 },
                      { day: "3", health: 48 },
                      { day: "4", health: 67 },
                      { day: "5", health: 79 },
                      { day: "6", health: 63 },
                      { day: "7", health: 72 },
                      { day: "8", health: 92 },
                    ]}
                  >
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="health"
                      stroke="#394c83"
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive
                      animationDuration={1800}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="dh-muted">Your health trend</p>
            </article>
          </section>

          <section className="dh-middle-grid">
            <article className="dh-card dh-map-card">
              <div className="dh-card-heading">
                <h3>Nearby Healthcare Services</h3>
                <span className="dh-map-badge">Map</span>
              </div>
              <iframe
                title="Healthcare services map in Kuala Lumpur"
                src="https://maps.google.com/maps?q=Kuala%20Lumpur%20Malaysia&t=&z=11&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p className="dh-muted">
                Explore healthcare services around Kuala Lumpur.
              </p>
            </article>

            <article className="dh-card dh-appointments-card">
              <h3>Previous Appointments</h3>
              <div className="dh-appointment-list">
                {appointments.map((appointment) => (
                  <div className="dh-appointment-row" key={appointment.name}>
                    <div className="dh-doctor-avatar">
                      {appointment.initials}
                    </div>
                    <div className="dh-doctor-info">
                      <strong>{appointment.name}</strong>
                      <span>{appointment.type}</span>
                    </div>
                    <span className="dh-appointment-date">
                      {appointment.date}
                    </span>
                  </div>
                ))}
              </div>

              <h3 className="dh-upcoming-title">Upcoming Appointments</h3>
              <div className="dh-period-switch">
                {["Days", "Months", "Years"].map((item) => (
                  <button
                    key={item}
                    className={period === item ? "active" : ""}
                    onClick={() => setPeriod(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="dh-appointment-row dh-upcoming-row">
                <div className="dh-doctor-avatar">DM</div>
                <div className="dh-doctor-info">
                  <strong>Dr. Mustafa</strong>
                  <span>Emergency</span>
                </div>
                <span className="dh-appointment-date">
                  {period === "Days"
                    ? "Tuesday, April 5"
                    : period === "Months"
                      ? "April"
                      : "2027"}
                </span>
              </div>
            </article>
          </section>

          <section className="dh-trends-grid">
            <TrendCard
              title="Heart Rate"
              value="76 BPM"
              change="+2%"
              dataKey="rate"
              data={[
                { time: "1", rate: 62 },
                { time: "2", rate: 65 },
                { time: "3", rate: 60 },
                { time: "4", rate: 74 },
                { time: "5", rate: 70 },
                { time: "6", rate: 82 },
                { time: "7", rate: 76 },
              ]}
            />

            <TrendCard
              title="Symptoms"
              value="70%"
              change="+3%"
              dataKey="symptoms"
              data={[
                { time: "1", symptoms: 25 },
                { time: "2", symptoms: 22 },
                { time: "3", symptoms: 28 },
                { time: "4", symptoms: 40 },
                { time: "5", symptoms: 32 },
                { time: "6", symptoms: 48 },
                { time: "7", symptoms: 55 },
              ]}
            />
          </section>

          <section className="dh-bottom-grid">
            <article className="dh-card dh-wellness-card">
              <h3>Chronic Wellness Tracker</h3>
              <p className="dh-muted">Health indicators by year</p>

              <div className="dh-radar-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={wellnessData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="year" />
                    <PolarRadiusAxis angle={30} domain={[0, 120]} />
                    <Radar
                      name="Malaria"
                      dataKey="Malaria"
                      stroke="#2388ff"
                      fill="#2388ff"
                      fillOpacity={0.15}
                      isAnimationActive
                      animationDuration={1600}
                    />
                    <Radar
                      name="Cold"
                      dataKey="Cold"
                      stroke="#10cba2"
                      fill="#10cba2"
                      fillOpacity={0.12}
                      isAnimationActive
                      animationDuration={1800}
                    />
                    <Radar
                      name="Typhoid"
                      dataKey="Typhoid"
                      stroke="#ffb321"
                      fill="#ffb321"
                      fillOpacity={0.1}
                      isAnimationActive
                      animationDuration={2000}
                    />
                    <Radar
                      name="Cough"
                      dataKey="Cough"
                      stroke="#ff4d68"
                      fill="#ff4d68"
                      fillOpacity={0.1}
                      isAnimationActive
                      animationDuration={2200}
                    />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="dh-card dh-statistics-card">
              <h3>Appointment Statistics</h3>
              <p className="dh-muted">Monthly appointment categories</p>

              <div className="dh-bar-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={appointmentStats}
                    margin={{ top: 15, right: 4, left: -18, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar
                      dataKey="Emergency"
                      stackId="a"
                      fill="#168bff"
                      isAnimationActive
                      animationDuration={1200}
                    />
                    <Bar
                      dataKey="Examination"
                      stackId="a"
                      fill="#0fd39a"
                      isAnimationActive
                      animationDuration={1400}
                    />
                    <Bar
                      dataKey="Consultation"
                      stackId="a"
                      fill="#ffb323"
                      isAnimationActive
                      animationDuration={1600}
                    />
                    <Bar
                      dataKey="Routine"
                      stackId="a"
                      fill="#ff4d68"
                      radius={[5, 5, 0, 0]}
                      isAnimationActive
                      animationDuration={1800}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
          </section>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default Dashboard;
