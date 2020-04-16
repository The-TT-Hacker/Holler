import React from 'react'

import { Card } from 'react-bootstrap'

import { Area, AreaChart, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import '../../../styles/explore.css'

const Chart = () => {
    const data = [{ name: 'Week 1', 'Groups Joined': 3, 'Total Badges': 2 },
    { name: 'Week 2', 'Groups Joined': 3, 'Total Badges': 2 },
    { name: 'Week 3', 'Groups Joined': 1, 'Total Badges': 5 },
    { name: 'Week 4', 'Groups Joined': 2, 'Total Badges': 12 }];

    return (
        <div className="row">
            <div className="col">

                <Card className="chart-card">
                    <Card.Body style={{ width: '100%', height: '100%' }}>
                        <ResponsiveContainer width={'99%'} height={300}>
                            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>

                                <defs>
                                    <linearGradient id="colorGroupsJoined" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#E3496B" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#E3496B" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorTotalBadges" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FEA31F" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#FEA31F" stopOpacity={0} />
                                    </linearGradient>
                                </defs>

                                <Legend />

                                <XAxis axisLine={false} tick={true} dataKey="name" />
                                <YAxis axisLine={false} tick={true} />

                                <Tooltip />
                                <Area type="monotone" dataKey="Groups Joined" stroke="#E3496B" fillOpacity={1} fill="url(#colorGroupsJoined)" />
                                <Area type="monotone" dataKey="Total Badges" stroke="#FEA31F" fillOpacity={1} fill="url(#colorTotalBadges)" />
                            </AreaChart>
                        </ResponsiveContainer>

                    </Card.Body>
                </Card>

            </div>
        </div>
    )
}

export default Chart