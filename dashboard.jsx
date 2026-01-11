const { useState, useEffect, useRef } = React;

// Mock data for Driven platform
const mockData = {
    kpis: {
        totalViews: { value: 152400, change: 12.5, label: 'Total Video Views' },
        activeUsers: { value: 8234, change: 8.3, label: 'Active Users' },
        engagementRate: { value: 64.2, change: 5.7, label: 'Engagement Rate' },
        signups: { value: 3847, change: 15.2, label: 'Early Access Sign-ups' }
    },
    videoViews: [
        { month: 'Jul', views: 45000, watchTime: 12000 },
        { month: 'Aug', views: 58000, watchTime: 15500 },
        { month: 'Sep', views: 72000, watchTime: 19200 },
        { month: 'Oct', views: 89000, watchTime: 23400 },
        { month: 'Nov', views: 108000, watchTime: 28100 },
        { month: 'Dec', views: 135000, watchTime: 34500 },
        { month: 'Jan', views: 152400, watchTime: 38900 }
    ],
    platformEngagement: [
        { 
            platform: 'YouTube', 
            followers: 12500, 
            engagement: 8.2,
            weeklyData: {
                posts: [12, 15, 18, 22, 28, 35, 30],
                reposts: [45, 52, 48, 65, 72, 88, 75],
                comments: [234, 278, 312, 389, 445, 502, 478]
            },
            stateEngagement: {
                'CA': 8500, 'TX': 6200, 'FL': 4800, 'NY': 5200, 'PA': 3100,
                'IL': 2800, 'OH': 2600, 'GA': 2400, 'NC': 2200, 'MI': 2000
            }
        },
        { 
            platform: 'Instagram', 
            followers: 18300, 
            engagement: 12.5,
            weeklyData: {
                posts: [18, 22, 25, 28, 32, 38, 35],
                reposts: [156, 189, 201, 245, 289, 334, 312],
                comments: [445, 523, 589, 678, 756, 834, 789]
            },
            stateEngagement: {
                'CA': 12500, 'NY': 8200, 'FL': 7800, 'TX': 6500, 'IL': 3800,
                'PA': 3200, 'OH': 2900, 'NC': 2700, 'GA': 2600, 'MI': 2400
            }
        },
        { 
            platform: 'TikTok', 
            followers: 24700, 
            engagement: 15.8,
            weeklyData: {
                posts: [25, 32, 38, 45, 52, 62, 58],
                reposts: [567, 645, 712, 834, 923, 1045, 989],
                comments: [1234, 1456, 1678, 1923, 2156, 2445, 2312]
            },
            stateEngagement: {
                'CA': 15200, 'TX': 9800, 'FL': 8900, 'NY': 7200, 'GA': 4200,
                'NC': 3800, 'IL': 3500, 'OH': 3200, 'PA': 3000, 'MI': 2800
            }
        },
        { 
            platform: 'Facebook', 
            followers: 9200, 
            engagement: 5.4,
            weeklyData: {
                posts: [8, 10, 12, 14, 16, 19, 17],
                reposts: [23, 28, 32, 38, 45, 52, 48],
                comments: [89, 103, 118, 134, 156, 178, 167]
            },
            stateEngagement: {
                'FL': 3200, 'TX': 2800, 'CA': 2500, 'NY': 1900, 'PA': 1500,
                'OH': 1400, 'IL': 1200, 'NC': 1100, 'GA': 1000, 'MI': 900
            }
        }
    ],
    topVideos: [
        { title: 'The Art of Speed - Trailer', views: 24500, duration: '2:34', comments: 1234, shares: 456 },
        { title: 'Tanner Foust X Games Highlights', views: 18200, duration: '4:12', comments: 892, shares: 334 },
        { title: 'Emelia\'s 1000HP Build Reveal', views: 15800, duration: '8:45', comments: 1567, shares: 289 },
        { title: 'Behind the Scenes: F-Bomb Camaro', views: 12300, duration: '6:20', comments: 678, shares: 223 }
    ],
    trafficSources: [
        { source: 'Social Media', value: 45, percentage: '45%' },
        { source: 'Direct', value: 28, percentage: '28%' },
        { source: 'Search', value: 18, percentage: '18%' },
        { source: 'Referral', value: 9, percentage: '9%' }
    ]
};

// Automotive Icon Components
function AutomotiveIcon({ type }) {
    const icons = {
        headphones: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path d="M12 3C7.03 3 3 7.03 3 12v7c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-2c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z"/>
            </svg>
        ),
        speedometer: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6v2M12 16v2M6 12h2M16 12h2M8.5 8.5l1.4 1.4M14.1 14.1l1.4 1.4M8.5 15.5l1.4-1.4"/>
                <circle cx="12" cy="12" r="1.5"/>
                <path d="M12 12l4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
        ),
        wheel: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2"/>
                <path d="M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
        ),
        steering: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="2"/>
                <path d="M12 2C6.48 2 2 6.48 2 12c0 2.5.93 4.77 2.45 6.5L7 16.95C5.77 15.87 5 14.26 5 12.5c0-3.87 3.13-7 7-7s7 3.13 7 7c0 1.76-.77 3.37-2 4.45l2.55 1.55C21.07 16.77 22 14.5 22 12c0-5.52-4.48-10-10-10z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 17l2-2h6l2 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        )
    };
    return icons[type];
}

// KPI Card Component
function KPICard({ data, color, iconType }) {
    const colors = {
        lightBlue: 'from-cyan-400 to-cyan-600',
        mediumBlue: 'from-blue-500 to-blue-700',
        blue1: 'from-cyan-500 to-blue-600',
        blue2: 'from-blue-400 to-blue-600'
    };
    
    const isPositive = data.change > 0;
    
    return (
        <div className={`gradient-card ${colors[color]} rounded-xl p-6 text-white card-shadow stat-card`}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium opacity-90">{data.label}</span>
                <AutomotiveIcon type={iconType} />
            </div>
            <div className="text-3xl font-bold mb-1">
                {data.label.includes('Rate') ? `${data.value}%` : data.value.toLocaleString()}
            </div>
            <div className="flex items-center text-sm">
                <span className={`font-semibold ${isPositive ? 'text-green-200' : 'text-red-200'}`}>
                    {isPositive ? '↑' : '↓'} {Math.abs(data.change)}%
                </span>
                <span className="ml-2 opacity-75">vs last month</span>
            </div>
        </div>
    );
}

// Export Report Function
function exportReport() {
    const reportData = {
        generated: new Date().toISOString(),
        kpis: mockData.kpis,
        summary: {
            totalViews: mockData.kpis.totalViews.value,
            activeUsers: mockData.kpis.activeUsers.value,
            engagementRate: mockData.kpis.engagementRate.value,
            signups: mockData.kpis.signups.value
        },
        topVideos: mockData.topVideos,
        platformEngagement: mockData.platformEngagement.map(p => ({
            platform: p.platform,
            followers: p.followers,
            engagement: p.engagement
        }))
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `driven-analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// US Heat Map Component
function USHeatMap({ platform, data }) {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        if (!canvasRef.current || !data) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get max value for color scaling
        const maxValue = Math.max(...Object.values(data));
        
        // Simple state positions (approximate, for demo purposes)
        const statePositions = {
            'CA': { x: 50, y: 150, size: 60 },
            'TX': { x: 250, y: 200, size: 55 },
            'FL': { x: 380, y: 240, size: 45 },
            'NY': { x: 400, y: 80, size: 35 },
            'PA': { x: 380, y: 100, size: 30 },
            'IL': { x: 280, y: 120, size: 30 },
            'OH': { x: 330, y: 110, size: 28 },
            'GA': { x: 350, y: 200, size: 28 },
            'NC': { x: 370, y: 180, size: 28 },
            'MI': { x: 320, y: 90, size: 28 }
        };
        
        // Draw states
        Object.entries(data).forEach(([state, value]) => {
            const pos = statePositions[state];
            if (!pos) return;
            
            const intensity = value / maxValue;
            
            // Color gradient from dark blue to light blue
            const r = Math.floor(25 + intensity * 27); // 52 (dark) to 255 (light)
            const g = Math.floor(120 + intensity * 75); // 120 to 195
            const b = Math.floor(238 * intensity); // 0 to 238
            
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, pos.size, 0, Math.PI * 2);
            ctx.fill();
            
            // State label
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px Inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(state, pos.x, pos.y - 5);
            
            // Value label
            ctx.font = '10px Inter';
            ctx.fillText((value / 1000).toFixed(1) + 'k', pos.x, pos.y + 8);
        });
        
    }, [platform, data]);
    
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <canvas 
                ref={canvasRef} 
                width={500} 
                height={300}
                className="max-w-full"
            />
            {platform && (
                <div className="absolute top-2 right-2 text-xs px-3 py-1 rounded-full" 
                     style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#19c3ee' }}>
                    {platform} Engagement by State
                </div>
            )}
        </div>
    );
}

// Line Chart Component
function LineChart({ data }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    
    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map(d => d.month),
                    datasets: [
                        {
                            label: 'Video Views',
                            data: data.map(d => d.views),
                            borderColor: '#3478f8',
                            backgroundColor: 'rgba(52, 120, 248, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 4,
                            pointHoverRadius: 6,
                            pointBackgroundColor: '#3478f8'
                        },
                        {
                            label: 'Watch Time (hours)',
                            data: data.map(d => d.watchTime),
                            borderColor: '#19c3ee',
                            backgroundColor: 'rgba(25, 195, 238, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 4,
                            pointHoverRadius: 6,
                            pointBackgroundColor: '#19c3ee'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: { color: '#ffffff', font: { size: 12 } }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            ticks: { color: '#a0a0b0' }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#a0a0b0' }
                        }
                    }
                }
            });
        }
        
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);
    
    return <canvas ref={canvasRef}></canvas>;
}

// Bar Chart Component with Click Interaction
function BarChart({ data, onPlatformClick, selectedPlatform }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    
    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(d => d.platform),
                    datasets: [
                        {
                            label: 'Followers',
                            data: data.map(d => d.followers),
                            backgroundColor: data.map((d) => 
                                selectedPlatform === d.platform ? '#ffffff' : 'rgba(52, 120, 248, 0.8)'
                            ),
                            borderRadius: 8
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const index = elements[0].index;
                            onPlatformClick(data[index].platform);
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                afterLabel: () => 'Click to see geographic breakdown'
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            ticks: { color: '#a0a0b0' }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#a0a0b0' }
                        }
                    }
                }
            });
        }
        
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data, selectedPlatform, onPlatformClick]);
    
    return <canvas ref={canvasRef} style={{ cursor: 'pointer' }}></canvas>;
}

// Doughnut Chart Component
function DoughnutChart({ data }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    
    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            
            chartRef.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: data.map(d => `${d.source} (${d.percentage})`),
                    datasets: [{
                        data: data.map(d => d.value),
                        backgroundColor: [
                            'rgba(52, 120, 248, 0.9)',
                            'rgba(25, 195, 238, 0.9)',
                            'rgba(52, 120, 248, 0.6)',
                            'rgba(25, 195, 238, 0.6)'
                        ],
                        borderWidth: 2,
                        borderColor: '#000000'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { 
                                color: '#ffffff',
                                padding: 15,
                                font: { size: 11 }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.parsed}%`;
                                }
                            }
                        }
                    }
                }
            });
        }
        
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);
    
    return <canvas ref={canvasRef}></canvas>;
}

// Main Dashboard Component
function Dashboard() {
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    
    const handlePlatformClick = (platform) => {
        setSelectedPlatform(selectedPlatform === platform ? null : platform);
    };
    
    const getStateData = () => {
        if (!selectedPlatform) return null;
        const platform = mockData.platformEngagement.find(p => p.platform === selectedPlatform);
        return platform ? platform.stateEngagement : null;
    };
    
    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="bg-white rounded-xl p-6 card-shadow">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <img 
                                    src="https://images.fillout.com/orgid-234765/flowpublicid-aNyrvjd8Peus/widgetid-undefined/7An11ykd1KTPenpN2yqGGZ/logo-white.png?a=c1kaPUSB8CTHJw5zZavcLh" 
                                    alt="Driven Logo" 
                                    className="h-12"
                                />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
                                    <p className="text-gray-500 mt-1">Pre-Launch Community Metrics</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-sm text-gray-500">
                                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                                <button 
                                    onClick={exportReport}
                                    className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition"
                                    style={{ background: 'linear-gradient(90deg, #3478f8 0%, #19c3ee 100%)' }}
                                >
                                    Export Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <KPICard data={mockData.kpis.totalViews} color="mediumBlue" iconType="headphones" />
                    <KPICard data={mockData.kpis.activeUsers} color="lightBlue" iconType="steering" />
                    <KPICard data={mockData.kpis.engagementRate} color="blue1" iconType="speedometer" />
                    <KPICard data={mockData.kpis.signups} color="blue2" iconType="wheel" />
                </div>

                {/* Main Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Video Views Trend */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Video Performance Trends</h3>
                        <div className="chart-container">
                            <LineChart data={mockData.videoViews} />
                        </div>
                    </div>

                    {/* Traffic Sources */}
                    <div className="bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Traffic Sources</h3>
                        <div className="chart-container">
                            <DoughnutChart data={mockData.trafficSources} />
                        </div>
                    </div>
                </div>

                {/* Second Row - Social Media & Heat Map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Social Platform Engagement */}
                    <div className="bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Social Media Followers</h3>
                        <p className="text-xs text-gray-500 mb-4">💡 Click a bar to see geographic engagement</p>
                        <div className="chart-container">
                            <BarChart 
                                data={mockData.platformEngagement} 
                                onPlatformClick={handlePlatformClick}
                                selectedPlatform={selectedPlatform}
                            />
                        </div>
                    </div>

                    {/* US Heat Map */}
                    <div className="bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {selectedPlatform ? `${selectedPlatform} - US Engagement` : 'Geographic Engagement'}
                        </h3>
                        <div className="chart-container">
                            {selectedPlatform ? (
                                <USHeatMap platform={selectedPlatform} data={getStateData()} />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                    Select a social platform to view geographic distribution
                                </div>
                            )}
                        </div>
                        {selectedPlatform && (
                            <button 
                                onClick={() => setSelectedPlatform(null)}
                                className="mt-4 text-sm hover:underline"
                                style={{ color: '#19c3ee' }}
                            >
                                ← Clear selection
                            </button>
                        )}
                    </div>
                </div>

                {/* Bottom Section - Top Videos and Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Top Videos List */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Videos</h3>
                        <div className="space-y-3">
                            {mockData.topVideos.map((video, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                                             style={{ background: idx % 2 === 0 ? '#3478f8' : '#19c3ee' }}>
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800">{video.title}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {video.duration} • {video.comments.toLocaleString()} comments • {video.shares} shares
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-gray-800">{video.views.toLocaleString()}</div>
                                        <div className="text-sm text-gray-500">views</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Key Insights */}
                    <div className="bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
                        <div className="space-y-4">
                            <div className="p-4 rounded-lg border" style={{ backgroundColor: 'rgba(52, 120, 248, 0.1)', borderColor: 'rgba(52, 120, 248, 0.3)' }}>
                                <div className="text-sm font-medium mb-1" style={{ color: '#3478f8' }}>Peak Engagement</div>
                                <div className="text-xs" style={{ color: '#19c3ee' }}>Weekend traffic increased 23% - optimal for content releases</div>
                            </div>
                            <div className="p-4 rounded-lg border" style={{ backgroundColor: 'rgba(25, 195, 238, 0.1)', borderColor: 'rgba(25, 195, 238, 0.3)' }}>
                                <div className="text-sm font-medium mb-1" style={{ color: '#19c3ee' }}>Social Growth</div>
                                <div className="text-xs" style={{ color: '#3478f8' }}>TikTok leading with 15.8% engagement rate - strong viral potential</div>
                            </div>
                            <div className="p-4 rounded-lg border" style={{ backgroundColor: 'rgba(52, 120, 248, 0.1)', borderColor: 'rgba(52, 120, 248, 0.3)' }}>
                                <div className="text-sm font-medium mb-1" style={{ color: '#3478f8' }}>Conversion Rate</div>
                                <div className="text-xs" style={{ color: '#19c3ee' }}>46.7% visitor-to-signup rate - exceeding industry benchmarks</div>
                            </div>
                            <div className="p-4 rounded-lg border" style={{ backgroundColor: 'rgba(25, 195, 238, 0.1)', borderColor: 'rgba(25, 195, 238, 0.3)' }}>
                                <div className="text-sm font-medium mb-1" style={{ color: '#19c3ee' }}>Geographic Insights</div>
                                <div className="text-xs" style={{ color: '#3478f8' }}>CA, TX, and FL drive 45% of total engagement - strong automotive markets</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>Dashboard Demo for Driven Platform • Created by Janet</p>
                </div>
            </div>
        </div>
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Dashboard />);
