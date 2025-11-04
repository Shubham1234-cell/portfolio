// React Components for Dynamic Portfolio Content

const { useState, useEffect, useRef } = React;

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        let startTime;
        const startCount = 0;
        const endCount = end;

        const updateCount = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(startCount + (endCount - startCount) * easeOutQuart);
            
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        };

        requestAnimationFrame(updateCount);
    }, [isVisible, end, duration]);

    return (
        <span ref={ref} className="animated-counter">
            {count}{suffix}
        </span>
    );
};

// Skill Progress Bar Component
const SkillProgressBar = ({ skill, percentage, icon, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} className="skill-item">
            <i className={icon}></i>
            <span>{skill}</span>
            <div className="skill-bar">
                <div 
                    className="skill-progress"
                    style={{
                        width: isVisible ? `${percentage}%` : '0%',
                        transition: 'width 1.5s ease-in-out'
                    }}
                ></div>
            </div>
        </div>
    );
};

// Project Card Component
const ProjectCard = ({ title, description, technologies, imageUrl, liveUrl, githubUrl }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="project-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="project-image" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className={`project-overlay ${isHovered ? 'active' : ''}`}>
                    <div className="project-links">
                        <a href={liveUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-external-link-alt"></i>
                        </a>
                        <a href={githubUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="project-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="project-tech">
                    {technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Timeline Item Component
const TimelineItem = ({ title, company, date, description, achievements }) => {
    return (
        <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
                <h3>{title}</h3>
                <h4>{company}</h4>
                <span className="timeline-date">{date}</span>
                <p>{description}</p>
                <ul>
                    {achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Certification Card Component
// CertificationCard removed per project changes (certifications have been removed from the site)

// Contact Form Component
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            
            setTimeout(() => setSubmitStatus(null), 3000);
        } catch (error) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                />
            </div>
            <div className="form-group">
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="5"
                    required
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <span className="loading"></span>
                        Sending...
                    </>
                ) : (
                    <>
                        <i className="fas fa-paper-plane"></i>
                        Send Message
                    </>
                )}
            </button>
            
            {submitStatus && (
                <div className={`submit-status ${submitStatus}`}>
                    {submitStatus === 'success' ? (
                        <i className="fas fa-check-circle"></i>
                    ) : (
                        <i className="fas fa-exclamation-circle"></i>
                    )}
                    <span>
                        {submitStatus === 'success' 
                            ? 'Message sent successfully!' 
                            : 'Failed to send message. Please try again.'
                        }
                    </span>
                </div>
            )}
        </form>
    );
};

// Social Links Component
const SocialLinks = ({ links }) => {
    return (
        <div className="social-links">
            {links.map((link, index) => (
                <a
                    key={index}
                    href={link.url}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.name}
                >
                    <i className={link.icon}></i>
                </a>
            ))}
        </div>
    );
};

// Particle Background Component
const ParticleBackground = () => {
    const canvasRef = useRef();
    const particlesRef = useRef([]);
    const animationRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create particles
        const createParticles = () => {
            particlesRef.current = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
            
            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particlesRef.current.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around screen
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
                ctx.fill();
            });
            
            animationRef.current = requestAnimationFrame(animate);
        };

        createParticles();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
};

// Typewriter Effect Component
const TypewriterText = ({ texts, speed = 100, deleteSpeed = 50, pauseTime = 2000 }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fullText = texts[currentTextIndex];
            
            if (!isDeleting) {
                if (currentText.length < fullText.length) {
                    setCurrentText(fullText.slice(0, currentText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                if (currentText.length > 0) {
                    setCurrentText(currentText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? deleteSpeed : speed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseTime]);

    return (
        <span className="typewriter-text">
            {currentText}
            <span className="cursor">|</span>
        </span>
    );
};

// Scroll Progress Indicator
const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', updateScrollProgress);
        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    return (
        <div 
            className="scroll-progress"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${scrollProgress}%`,
                height: '3px',
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                zIndex: 10000,
                transition: 'width 0.1s ease'
            }}
        />
    );
};

// Export components for use
window.PortfolioComponents = {
    AnimatedCounter,
    SkillProgressBar,
    ProjectCard,
    TimelineItem,
    ContactForm,
    SocialLinks,
    ParticleBackground,
    TypewriterText,
    ScrollProgress
};

// Initialize React components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll progress indicator
    const scrollProgressContainer = document.createElement('div');
    document.body.appendChild(scrollProgressContainer);
    ReactDOM.render(<ScrollProgress />, scrollProgressContainer);

    // Add particle background to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const particleContainer = document.createElement('div');
        heroSection.appendChild(particleContainer);
        ReactDOM.render(<ParticleBackground />, particleContainer);
    }

    // Add typewriter effect to hero title
    const heroTitle = document.querySelector('.hero-title .name');
    if (heroTitle) {
        const typewriterContainer = document.createElement('span');
        heroTitle.innerHTML = '';
        heroTitle.appendChild(typewriterContainer);
        ReactDOM.render(
            <TypewriterText 
                texts={['Shubham Yadav', 'Computer Science Student', 'Problem Solver', 'Tech Enthusiast']}
                speed={150}
                deleteSpeed={75}
                pauseTime={2000}
            />, 
            typewriterContainer
        );
    }
});