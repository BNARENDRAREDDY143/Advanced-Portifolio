import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <h3 style={{ color: "#f3f4f6", marginBottom: "1rem" }}>Summary</h3>
            <p>
              Motivated Computer Science Engineering student with strong fundamentals in HTML, CSS, JavaScript, Python, and SQL. Seeking a Software Developer or Full Stack Developer Internship to apply problem-solving skills, build scalable web applications, and contribute to real-world projects while strengthening technical expertise.
            </p>
            <h3 style={{ color: "#f3f4f6", marginTop: "2rem", marginBottom: "1rem" }}>Education</h3>
            <ul style={{ color: "#9ca3af", listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "1rem" }}>
                <strong style={{ color: "#818cf8" }}>Bachelor of Technology in Computer Science and Engineering (Pursuing)</strong><br />
                Vignan's LARA Institute of Technology & Science | Vadlamudi | 2023 – 2027 | CGPA: 8.22
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong style={{ color: "#818cf8" }}>Intermediate (MPC)</strong><br />
                Sri Chaitanya junior college, Gorantla | 2021-2023 | Score: 88.7%
              </li>
              <li>
                <strong style={{ color: "#818cf8" }}>SSC</strong><br />
                Z.P.H.S High School, Telukutla | 2020-2021 | Score: 80%
              </li>
            </ul>
          </div>
          <div className="stats">
            <div className="stat-item">
              <h3>🎓</h3>
              <p>B.Tech CSE (8.22 CGPA)</p>
            </div>
            <div className="stat-item">
              <h3>🏆</h3>
              <p>50 Days LeetCode Badge (125+ problems)</p>
            </div>
            <div className="stat-item">
              <h3>📜</h3>
              <p>6+ Technical Certifications</p>
            </div>
            <div className="stat-item">
              <h3>🚀</h3>
              <p>Problem-Solving & Logical Thinking</p>
            </div>
          </div>
        </div>

        <div className="certifications-section" style={{ marginTop: "4rem" }}>
          <h2>Certifications</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {["Cisco – Introduction to Cyber Security", "AWS – Cloud Practitioner (Foundational)", "Udemy – Full Stack Development", "Infosys – Python Programming", "Infosys – Gen ai", "Infosys – Data science"].map((cert, index) => (
              <div key={index} style={{ background: "#1f2937", padding: "1.5rem", borderRadius: "10px", color: "#f3f4f6", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
                <span style={{ color: "#818cf8", marginRight: "10px" }}>•</span>{cert}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
