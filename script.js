const courses = [
  {
    title: "Circuit Analysis I",
    category: "foundational",
    description: "The foundation of all electronics. Learn Ohm's law, Kirchhoff's laws, and network theorems.",
    topics: ["Ohm's Law", "KVL/KCL", "Thevenin", "Norton", "Superposition"],
    details: "Covers DC circuit analysis: series/parallel resistors, voltage and current dividers, mesh and nodal analysis, source transformation, and maximum power transfer. Typically a first-year course with a lab component using breadboards and multimeters."
  },
  {
    title: "Digital Logic Design",
    category: "foundational",
    description: "Boolean algebra, logic gates, combinational and sequential circuits.",
    topics: ["Boolean Algebra", "K-Maps", "Flip-Flops", "Counters", "FSMs"],
    details: "Topics include number systems, logic minimization using Karnaugh maps, multiplexers, decoders, latches, registers, and finite state machine design. Often paired with an FPGA or Verilog lab."
  },
  {
    title: "Analog Electronics",
    category: "core",
    description: "Diodes, BJTs, MOSFETs, and amplifier design.",
    topics: ["Diodes", "BJT", "MOSFET", "Op-Amps", "Biasing"],
    details: "Study of semiconductor devices and their circuit applications. Includes small-signal analysis, common-emitter/collector/base configurations, differential amplifiers, and operational amplifier circuits such as integrators, differentiators, and active filters."
  },
  {
    title: "Signals & Systems",
    category: "core",
    description: "Continuous and discrete-time signals, Fourier and Laplace transforms.",
    topics: ["Convolution", "Fourier", "Laplace", "Z-Transform", "LTI Systems"],
    details: "Mathematical foundations for signal processing and control. Covers linear time-invariant systems, impulse response, frequency response, sampling theorem, and filter design basics."
  },
  {
    title: "Electromagnetics",
    category: "core",
    description: "Maxwell's equations, transmission lines, and wave propagation.",
    topics: ["Maxwell", "Transmission Lines", "Antennas", "Waveguides"],
    details: "Study of electric and magnetic fields, boundary conditions, plane waves, Smith charts, impedance matching, and fundamentals of antennas and microwave engineering."
  },
  {
    title: "Microcontrollers & Embedded Systems",
    category: "core",
    description: "Programming microcontrollers, interfacing peripherals, real-time systems.",
    topics: ["ARM", "C Programming", "GPIO", "Timers", "RTOS"],
    details: "Hands-on course covering microcontroller architecture, assembly and C programming, interrupt handling, ADC/DAC, serial protocols (UART, SPI, I2C), and embedded system design. Usually uses ARM Cortex-M or AVR platforms."
  },
  {
    title: "Control Systems",
    category: "advanced",
    description: "Feedback systems, stability, PID controllers, and state-space methods.",
    topics: ["PID", "Bode Plots", "Root Locus", "State-Space"],
    details: "Analysis and design of feedback control systems. Topics include transfer functions, stability criteria (Routh-Hurwitz, Nyquist), compensator design, and an introduction to modern state-space control and observers."
  },
  {
    title: "Digital Signal Processing",
    category: "advanced",
    description: "Discrete-time signals, FFT, digital filters, and DSP implementation.",
    topics: ["DFT/FFT", "FIR/IIR", "Sampling", "Windowing"],
    details: "Advanced study of discrete-time signal processing: z-transforms, DFT and FFT algorithms, design of FIR and IIR filters, multi-rate processing, and implementation on DSP chips or FPGAs."
  },
  {
    title: "VLSI Design",
    category: "advanced",
    description: "CMOS transistor-level design of integrated circuits.",
    topics: ["CMOS", "Layout", "Timing", "Power", "Verilog"],
    details: "Covers MOS transistor theory, CMOS inverter and logic design, stick diagrams, layout, parasitic capacitance, delay and power analysis, and an introduction to Verilog HDL and standard cell design flow."
  },
  {
    title: "Power Electronics",
    category: "advanced",
    description: "Converters, inverters, and control of electrical power.",
    topics: ["DC-DC", "Inverters", "Rectifiers", "PWM"],
    details: "Study of switching converters (buck, boost, buck-boost), isolated topologies, PWM control, semiconductor switches (IGBTs, MOSFETs), and applications in motor drives and renewable energy systems."
  }
];

const courseList = document.getElementById('courseList');
const searchBar = document.getElementById('searchBar');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentCategory = 'all';
let currentSearch = '';

function renderCourses() {
  const filtered = courses.filter(course => {
    const matchesCategory = currentCategory === 'all' || course.category === currentCategory;
    const matchesSearch = 
      course.title.toLowerCase().includes(currentSearch) ||
      course.description.toLowerCase().includes(currentSearch) ||
      course.topics.some(t => t.toLowerCase().includes(currentSearch));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    courseList.innerHTML = '<div class="no-results">No courses found. Try a different search.</div>';
    return;
  }

  courseList.innerHTML = filtered.map((course, i) => `
    <div class="course-card" data-index="${i}">
      <span class="category">${course.category}</span>
      <h2>${course.title}</h2>
      <p class="description">${course.description}</p>
      <ul class="topics">
        ${course.topics.map(t => `<li>${t}</li>`).join('')}
      </ul>
      <div class="details">${course.details}</div>
    </div>
  `).join('');

  document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('expanded'));
  });
}

searchBar.addEventListener('input', (e) => {
  currentSearch = e.target.value.toLowerCase();
  renderCourses();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    renderCourses();
  });
});

renderCourses();
