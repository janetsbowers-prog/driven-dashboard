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
        { platform: 'YouTube', followers: 12500, engagement: 8.2 },
        { platform: 'Instagram', followers: 18300, engagement: 12.5 },
        { platform: 'TikTok', followers: 24700, engagement: 15.8 },
        { platform: 'Facebook', followers: 9200, engagement: 5.4 }
    ],
    topVideos: [
        { title: 'The Art of Speed - Trailer', views: 24500, duration: '2:34' },
        { title: 'Tanner Foust X Games Highlights', views: 18200, duration: '4:12' },
        { title: 'Emelia\'s 1000HP Build Reveal', views: 15800, duration: '8:45' },
        { title: 'Behind the Scenes: F-Bomb Camaro', views: 12300, duration: '6:20' }
    ],
    trafficSources: [
        { source: 'Social Media', value: 45 },
        { source: 'Direct', value: 28 },
        { source: 'Search', value: 18 },
        { source: 'Referral', value: 9 }
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
        pink: 'from-pink-400 to-pink-600',
        purple: 'from-purple-400 to-purple-600',
        blue: 'from-blue-400 to-blue-600',
        indigo: 'from-indigo-400 to-indigo-600'
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
                            borderColor: 'rgb(139, 92, 246)',
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 4,
                            pointHoverRadius: 6
                        },
                        {
                            label: 'Watch Time (hours)',
                            data: data.map(d => d.watchTime),
                            borderColor: 'rgb(236, 72, 153)',
                            backgroundColor: 'rgba(236, 72, 153, 0.1)',
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
                            labels: { color: '#6b7280', font: { size: 12 } }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(0, 0, 0, 0.05)' },
                            ticks: { color: '#6b7280' }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#6b7280' }
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

// Bar Chart Component
function BarChart({ data }) {
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
                            backgroundColor: [
                                'rgba(239, 68, 68, 0.8)',
                                'rgba(236, 72, 153, 0.8)',
                                'rgba(59, 130, 246, 0.8)',
                                'rgba(139, 92, 246, 0.8)'
                            ],
                            borderRadius: 8
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(0, 0, 0, 0.05)' },
                            ticks: { color: '#6b7280' }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#6b7280' }
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
                    labels: data.map(d => d.source),
                    datasets: [{
                        data: data.map(d => d.value),
                        backgroundColor: [
                            'rgba(139, 92, 246, 0.8)',
                            'rgba(236, 72, 153, 0.8)',
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(16, 185, 129, 0.8)'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { 
                                color: '#6b7280',
                                padding: 15,
                                font: { size: 11 }
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

// Area Chart Component
function AreaChart({ data }) {
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
                    labels: data.map(d => d.day),
                    datasets: [{
                        label: 'Daily Sessions',
                        data: data.map(d => d.sessions),
                        borderColor: 'rgb(99, 102, 241)',
                        backgroundColor: 'rgba(99, 102, 241, 0.2)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        pointBackgroundColor: 'rgb(99, 102, 241)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(0, 0, 0, 0.05)' },
                            ticks: { color: '#6b7280' }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#6b7280' }
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
    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="bg-white rounded-xl p-6 card-shadow">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Driven Analytics</h1>
                                <p className="text-gray-500 mt-1">Engagement Dashboard - Pre-Launch Metrics</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-sm text-gray-500">
                                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                                <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition">
                                    Export Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <KPICard data={mockData.kpis.totalViews} color="pink" icon="📺" />
                    <KPICard data={mockData.kpis.activeUsers} color="purple" icon="👥" />
                    <KPICard data={mockData.kpis.engagementRate} color="blue" icon="💬" />
                    <KPICard data={mockData.kpis.signups} color="indigo" icon="✨" />
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
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Media Followers</h3>
                        <div className="chart-container">
                            <BarChart data={mockData.platformEngagement} />
                        </div>
                    </div>

                    {/* Weekly Activity */}
                    <div className="bg-white rounded-xl p-6 card-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Activity</h3>
                        <div className="chart-container">
                            <AreaChart data={mockData.weeklyActivity} />
                        </div>
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
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800">{video.title}</div>
                                            <div className="text-sm text-gray-500">{video.duration}</div>
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
                            <div className="p-4 bg-purple-50 rounded-lg">
                                <div className="text-sm font-medium text-purple-900 mb-1">Peak Engagement</div>
                                <div className="text-xs text-purple-700">Weekend traffic increased 23% - optimal for content releases</div>
                            </div>
                            <div className="p-4 bg-pink-50 rounded-lg">
                                <div className="text-sm font-medium text-pink-900 mb-1">Social Growth</div>
                                <div className="text-xs text-pink-700">TikTok leading with 15.8% engagement rate - strong viral potential</div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <div className="text-sm font-medium text-blue-900 mb-1">Conversion Rate</div>
                                <div className="text-xs text-blue-700">46.7% visitor-to-signup rate - exceeding industry benchmarks</div>
                            </div>
                            <div className="p-4 bg-indigo-50 rounded-lg">
                                <div className="text-sm font-medium text-indigo-900 mb-1">Content Strategy</div>
                                <div className="text-xs text-indigo-700">Build series content averaging 2.3x higher retention than general clips</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-white text-sm opacity-75">
                    <p>Dashboard Demo for Driven Platform • Created by Janet</p>
                </div>
            </div>
        </div>
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Dashboard />);
