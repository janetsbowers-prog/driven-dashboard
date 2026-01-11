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
        { month: 'Jul', views: 45000, watchTime: 12000, comments: 3200 },
        { month: 'Aug', views: 58000, watchTime: 15500, comments: 4100 },
        { month: 'Sep', views: 72000, watchTime: 19200, comments: 5400 },
        { month: 'Oct', views: 89000, watchTime: 23400, comments: 6800 },
        { month: 'Nov', views: 108000, watchTime: 28100, comments: 8500 },
        { month: 'Dec', views: 135000, watchTime: 34500, comments: 11200 },
        { month: 'Jan', views: 152400, watchTime: 38900, comments: 13800 }
    ],
    platformEngagement: [
        { 
            platform: 'YouTube', 
            followers: 12500, 
            engagement: 8.2,
            stateEngagement: {
                'CA': { views: 4500, comments: 2800, shares: 1200 },
                'TX': { views: 3200, comments: 2100, shares: 900 },
                'FL': { views: 2600, comments: 1500, shares: 700 },
                'NY': { views: 2800, comments: 1700, shares: 700 },
                'PA': { views: 1700, comments: 900, shares: 500 },
                'IL': { views: 1500, comments: 850, shares: 450 },
                'OH': { views: 1400, comments: 800, shares: 400 },
                'GA': { views: 1300, comments: 750, shares: 350 },
                'NC': { views: 1200, comments: 680, shares: 320 },
                'MI': { views: 1100, comments: 600, shares: 300 }
            }
        },
        { 
            platform: 'Instagram', 
            followers: 18300, 
            engagement: 12.5,
            stateEngagement: {
                'CA': { views: 6800, comments: 3900, shares: 1800 },
                'NY': { views: 4500, comments: 2500, shares: 1200 },
                'FL': { views: 4200, comments: 2400, shares: 1200 },
                'TX': { views: 3500, comments: 2000, shares: 1000 },
                'IL': { views: 2100, comments: 1100, shares: 600 },
                'PA': { views: 1800, comments: 950, shares: 450 },
                'OH': { views: 1600, comments: 850, shares: 450 },
                'NC': { views: 1500, comments: 780, shares: 420 },
                'GA': { views: 1450, comments: 750, shares: 400 },
                'MI': { views: 1350, comments: 700, shares: 350 }
            }
        },
        { 
            platform: 'Reddit', 
            followers: 19800, 
            engagement: 17.2,
            stateEngagement: {
                'CA': { views: 7200, comments: 4800, shares: 2100 },
                'TX': { views: 4800, comments: 3200, shares: 1400 },
                'NY': { views: 3900, comments: 2600, shares: 1100 },
                'FL': { views: 3200, comments: 2100, shares: 900 },
                'WA': { views: 2800, comments: 1850, shares: 800 },
                'IL': { views: 2200, comments: 1450, shares: 650 },
                'PA': { views: 1900, comments: 1250, shares: 550 },
                'OH': { views: 1700, comments: 1100, shares: 500 },
                'MI': { views: 1600, comments: 1050, shares: 450 },
                'CO': { views: 1500, comments: 1000, shares: 420 }
            }
        },
        { 
            platform: 'TikTok', 
            followers: 24700, 
            engagement: 15.8,
            stateEngagement: {
                'CA': { views: 8200, comments: 4500, shares: 2500 },
                'TX': { views: 5300, comments: 2900, shares: 1600 },
                'FL': { views: 4800, comments: 2600, shares: 1500 },
                'NY': { views: 3900, comments: 2100, shares: 1200 },
                'GA': { views: 2300, comments: 1200, shares: 700 },
                'NC': { views: 2100, comments: 1100, shares: 600 },
                'IL': { views: 1900, comments: 1000, shares: 600 },
                'OH': { views: 1750, comments: 950, shares: 500 },
                'PA': { views: 1650, comments: 900, shares: 450 },
                'MI': { views: 1550, comments: 850, shares: 400 }
            }
        },
        { 
            platform: 'Facebook', 
            followers: 9200, 
            engagement: 5.4,
            stateEngagement: {
                'FL': { views: 1800, comments: 950, shares: 450 },
                'TX': { views: 1550, comments: 850, shares: 400 },
                'CA': { views: 1400, comments: 750, shares: 350 },
                'NY': { views: 1050, comments: 550, shares: 300 },
                'PA': { views: 850, comments: 450, shares: 200 },
                'OH': { views: 780, comments: 410, shares: 210 },
                'IL': { views: 670, comments: 350, shares: 180 },
                'NC': { views: 610, comments: 320, shares: 170 },
                'GA': { views: 560, comments: 290, shares: 150 },
                'MI': { views: 510, comments: 270, shares: 120 }
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
    
    const tooltips = {
        'Total Video Views': 'Total number of video views across all content in the last 30 days',
        'Active Users': 'Unique users who engaged (viewed, commented, or shared) in the last 30 days',
        'Engagement Rate': 'Percentage of viewers who commented or shared content (active engagement vs. passive viewing)',
        'Early Access Sign-ups': 'Users who registered for platform early access via the waitlist'
    };
    
    const isPositive = data.change > 0;
    
    return (
        <div className={`gradient-card ${colors[color]} rounded-xl p-6 text-white card-shadow stat-card`} title={tooltips[data.label]}>
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

// Stacked Bar Chart for State Engagement
function StateEngagementChart({ platform, data }) {
    if (!data) return null;
    
    // Sort states by total engagement
    const sortedStates = Object.entries(data)
        .map(([state, metrics]) => ({
            state,
            ...metrics,
            total: metrics.views + metrics.comments + metrics.shares
        }))
        .sort((a, b) => b.total - a.total);
    
    const maxTotal = sortedStates[0]?.total || 1;
    
    return (
        <div className="space-y-3">
            {sortedStates.map((stateData, idx) => {
                const viewsPercent = (stateData.views / maxTotal) * 100;
                const commentsPercent = (stateData.comments / maxTotal) * 100;
                const sharesPercent = (stateData.shares / maxTotal) * 100;
                
                return (
                    <div key={stateData.state} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-medium" style={{ color: '#ffffff' }}>{stateData.state}</span>
                            <span style={{ color: '#a0a0b0' }}>{stateData.total.toLocaleString()} total</span>
                        </div>
                        <div className="flex h-6 rounded overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                            <div 
                                className="flex items-center justify-center text-xs font-medium transition-all"
                                style={{ 
                                    width: `${viewsPercent}%`,
                                    backgroundColor: '#3478f8',
                                    color: 'white'
                                }}
                                title={`Views: ${stateData.views.toLocaleString()}`}
                            >
                                {viewsPercent > 15 && stateData.views.toLocaleString()}
                            </div>
                            <div 
                                className="flex items-center justify-center text-xs font-medium transition-all"
                                style={{ 
                                    width: `${commentsPercent}%`,
                                    backgroundColor: '#19c3ee',
                                    color: 'white'
                                }}
                                title={`Comments: ${stateData.comments.toLocaleString()}`}
                            >
                                {commentsPercent > 15 && stateData.comments.toLocaleString()}
                            </div>
                            <div 
                                className="flex items-center justify-center text-xs font-medium transition-all"
                                style={{ 
                                    width: `${sharesPercent}%`,
                                    backgroundColor: '#ffffff',
                                    color: '#000000'
                                }}
                                title={`Shares: ${stateData.shares.toLocaleString()}`}
                            >
                                {sharesPercent > 10 && <span style={{ color: '#000000' }}>{stateData.shares.toLocaleString()}</span>}
                            </div>
                        </div>
                    </div>
                );
            })}
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-6 pt-4 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: '#3478f8' }}></div>
                    <span style={{ color: '#ffffff' }}>Views</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: '#19c3ee' }}></div>
                    <span style={{ color: '#ffffff' }}>Comments</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ffffff' }}></div>
                    <span style={{ color: '#ffffff' }}>Shares</span>
                </div>
            </div>
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
                        },
                        {
                            label: 'Comments',
                            data: data.map(d => d.comments || 0),
                            borderColor: '#ffffff',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 4,
                            pointHoverRadius: 6,
                            pointBackgroundColor: '#ffffff'
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
                                afterLabel: () => 'Click to see engagement breakdown by state'
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

                {/* Second Row - Social Media & Engagement Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Social Platform Engagement */}
                    <div className="bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Social Media Followers</h3>
                        <p className="text-xs text-gray-500 mb-4">💡 Click a bar to see engagement breakdown by state</p>
                        <div className="chart-container">
                            <BarChart 
                                data={mockData.platformEngagement} 
                                onPlatformClick={handlePlatformClick}
                                selectedPlatform={selectedPlatform}
                            />
                        </div>
                    </div>

                    {/* State Engagement Breakdown */}
                    <div className="bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {selectedPlatform ? `${selectedPlatform} - Engagement by State` : 'State Engagement Breakdown'}
                        </h3>
                        <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
                            {selectedPlatform ? (
                                <StateEngagementChart platform={selectedPlatform} data={getStateData()} />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                    Select a social platform to view engagement breakdown by state
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
                                <div className="text-sm font-medium mb-1" style={{ color: '#19c3ee' }}>Reddit Community</div>
                                <div className="text-xs" style={{ color: '#3478f8' }}>17.2% engagement rate - automotive subreddits driving pre-launch buzz and organic discussions</div>
                            </div>
                            <div className="p-4 rounded-lg border" style={{ backgroundColor: 'rgba(52, 120, 248, 0.1)', borderColor: 'rgba(52, 120, 248, 0.3)' }}>
                                <div className="text-sm font-medium mb-1" style={{ color: '#3478f8' }}>Conversion Rate</div>
                                <div className="text-xs" style={{ color: '#19c3ee' }}>46.7% visitor-to-signup rate - exceeding industry benchmarks</div>
                            </div>
                            <div className="p-4 rounded-lg border" style={{ backgroundColor: 'rgba(25, 195, 238, 0.1)', borderColor: 'rgba(25, 195, 238, 0.3)' }}>
                                <div className="text-sm font-medium mb-1" style={{ color: '#19c3ee' }}>Geographic Insights</div>
                                <div className="text-xs" style={{ color: '#3478f8' }}>CA dominates views while TX shows high share rates - indicates strong community advocacy</div>
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
