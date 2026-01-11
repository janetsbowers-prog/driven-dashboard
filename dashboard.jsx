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
    ],
    weeklyActivity: [
        { day: 'Mon', sessions: 1200 },
        { day: 'Tue', sessions: 1450 },
        { day: 'Wed', sessions: 1680 },
        { day: 'Thu', sessions: 1820 },
        { day: 'Fri', sessions: 2100 },
        { day: 'Sat', sessions: 2450 },
        { day: 'Sun', sessions: 1980 }
    ]
};

// KPI Card Component
function KPICard({ data, color, icon }) {
    const colors = {
        blue1: 'from-blue-500 to-blue-700',
        blue2: 'from-cyan-500 to-blue-600',
        blue3: 'from-sky-400 to-cyan-600',
        blue4: 'from-indigo-500 to-blue-600'
    };
    
    const isPositive = data.change > 0;
    
    return (
        <div className={`gradient-card ${colors[color]} rounded-xl p-6 text-white card-shadow stat-card`}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium opacity-90">{data.label}</span>
                <span className="text-2xl">{icon}</span>
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
                            borderColor: 'rgb(59, 130, 246)',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 4,
                            pointHoverRadius: 6
                        },
                        {
                            label: 'Watch Time (hours)',
                            data: data.map(d => d.watchTime),
                            borderColor: 'rgb(6, 182, 212)',
                            backgroundColor: 'rgba(6, 182, 212, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 4,
                            pointHoverRadius: 6
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
                            labels: { color: '#e0e0e0', font: { size: 12 } }
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
                            backgroundColor: data.map((d, idx) => 
                                selectedPlatform === d.platform 
                                    ? 'rgba(59, 130, 246, 1)' 
                                    : ['rgba(239, 68, 68, 0.8)', 'rgba(236, 72, 153, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(139, 92, 246, 0.8)'][idx]
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
                                afterLabel: () => 'Click to see weekly breakdown'
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

// Doughnut Chart Component with Percentages
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
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(6, 182, 212, 0.8)',
                            'rgba(139, 92, 246, 0.8)',
                            'rgba(16, 185, 129, 0.8)'
                        ],
                        borderWidth: 2,
                        borderColor: '#1e1e2e'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { 
                                color: '#e0e0e0',
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

// Platform Detail Chart Component
function PlatformDetailChart({ platform, data }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    useEffect(() => {
        if (canvasRef.current && data) {
            const ctx = canvasRef.current.getContext('2d');
            
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: days,
                    datasets: [
                        {
                            label: '# Posts',
                            data: data.posts,
                            borderColor: 'rgb(59, 130, 246)',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: '# Reposts/Shares',
                            data: data.reposts,
                            borderColor: 'rgb(6, 182, 212)',
                            backgroundColor: 'rgba(6, 182, 212, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: '# Comments',
                            data: data.comments,
                            borderColor: 'rgb(139, 92, 246)',
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            tension: 0.4,
                            fill: true
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
                            labels: { color: '#e0e0e0', font: { size: 11 } }
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
    }, [platform, data]);
    
    return <canvas ref={canvasRef}></canvas>;
}

// Main Dashboard Component
function Dashboard() {
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    
    const handlePlatformClick = (platform) => {
        setSelectedPlatform(selectedPlatform === platform ? null : platform);
    };
    
    const getPlatformData = () => {
        if (!selectedPlatform) return null;
        const platform = mockData.platformEngagement.find(p => p.platform === selectedPlatform);
        return platform ? platform.weeklyData : null;
    };
    
    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="bg-white rounded-xl p-6 card-shadow">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <div className="text-white font-black text-3xl tracking-wider" style={{
                                    background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontStyle: 'italic',
                                    letterSpacing: '0.1em'
                                }}>
                                    DRIVEN
                                </div>
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
                                    className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition hover:from-blue-600 hover:to-cyan-700"
                                >
                                    Export Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <KPICard data={mockData.kpis.totalViews} color="blue1" icon="📺" />
                    <KPICard data={mockData.kpis.activeUsers} color="blue2" icon="👥" />
                    <KPICard data={mockData.kpis.engagementRate} color="blue3" icon="💬" />
                    <KPICard data={mockData.kpis.signups} color="blue4" icon="✨" />
                </div>

                {/* Main Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Video Views Trend - Takes 2 columns */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Video Performance Trends</h3>
                        <div className="chart-container">
                            <LineChart data={mockData.videoViews} />
                        </div>
                    </div>

                    {/* Traffic Sources - 1 column */}
                    <div className="bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Traffic Sources</h3>
                        <div className="chart-container">
                            <DoughnutChart data={mockData.trafficSources} />
                        </div>
                    </div>
                </div>

                {/* Second Row of Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Social Platform Engagement */}
                    <div className="bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Social Media Followers</h3>
                        <p className="text-xs text-gray-500 mb-4">💡 Click a bar to see weekly engagement breakdown</p>
                        <div className="chart-container">
                            <BarChart 
                                data={mockData.platformEngagement} 
                                onPlatformClick={handlePlatformClick}
                                selectedPlatform={selectedPlatform}
                            />
                        </div>
                    </div>

                    {/* Weekly Activity or Platform Detail */}
                    <div className="bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {selectedPlatform ? `${selectedPlatform} - Weekly Breakdown` : 'Overall Weekly Activity'}
                        </h3>
                        <div className="chart-container">
                            {selectedPlatform ? (
                                <PlatformDetailChart platform={selectedPlatform} data={getPlatformData()} />
                            ) : (
                                <LineChart data={mockData.weeklyActivity.map(d => ({ month: d.day, views: d.sessions, watchTime: 0 }))} />
                            )}
                        </div>
                        {selectedPlatform && (
                            <button 
                                onClick={() => setSelectedPlatform(null)}
                                className="mt-4 text-sm text-blue-400 hover:text-blue-300"
                            >
                                ← Back to overall activity
                            </button>
                        )}
                    </div>
                </div>

                {/* Bottom Section - Top Videos and Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Top Videos List - 2 columns */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Videos</h3>
                        <div className="space-y-3">
                            {mockData.topVideos.map((video, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold">
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

                    {/* Key Insights - 1 column */}
                    <div className="bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-900 bg-opacity-10 rounded-lg border border-blue-500 border-opacity-20">
                                <div className="text-sm font-medium text-blue-300 mb-1">Peak Engagement</div>
                                <div className="text-xs text-blue-200">Weekend traffic increased 23% - optimal for content releases</div>
                            </div>
                            <div className="p-4 bg-cyan-900 bg-opacity-10 rounded-lg border border-cyan-500 border-opacity-20">
                                <div className="text-sm font-medium text-cyan-300 mb-1">Social Growth</div>
                                <div className="text-xs text-cyan-200">TikTok leading with 15.8% engagement rate - strong viral potential</div>
                            </div>
                            <div className="p-4 bg-blue-900 bg-opacity-10 rounded-lg border border-blue-500 border-opacity-20">
                                <div className="text-sm font-medium text-blue-300 mb-1">Conversion Rate</div>
                                <div className="text-xs text-blue-200">46.7% visitor-to-signup rate - exceeding industry benchmarks</div>
                            </div>
                            <div className="p-4 bg-cyan-900 bg-opacity-10 rounded-lg border border-cyan-500 border-opacity-20">
                                <div className="text-sm font-medium text-cyan-300 mb-1">Community Engagement</div>
                                <div className="text-xs text-cyan-200">Avg 3.2k comments per video - highly engaged automotive enthusiast community</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-400 text-sm">
                    <p>Dashboard Demo for Driven Platform • Created by Janet</p>
                </div>
            </div>
        </div>
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Dashboard />);
