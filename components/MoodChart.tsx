
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MoodEntry } from '../types';

interface MoodChartProps {
  data: MoodEntry[];
}

const moodToValue = (mood: string): number => {
    switch (mood) {
        case 'Ecstatic': return 6;
        case 'Happy': return 5;
        case 'Okay': return 4;
        case 'Sad': return 3;
        case 'Anxious': return 2;
        case 'Stressed': return 1;
        default: return 0;
    }
};

const valueToMood = (value: number): string => {
    switch (value) {
        case 6: return 'Ecstatic';
        case 5: return 'Happy';
        case 4: return 'Okay';
        case 3: return 'Sad';
        case 2: return 'Anxious';
        case 1: return 'Stressed';
        default: return '';
    }
};

const MoodChart: React.FC<MoodChartProps> = ({ data }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        checkDarkMode();

        // Use a MutationObserver to watch for class changes on the <html> element
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const chartData = data
        .map(entry => ({
            date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            moodValue: moodToValue(entry.mood),
            note: entry.note,
            mood: entry.mood,
        }))
        .reverse(); // Show oldest first

    const tickColor = isDarkMode ? '#cbd5e1' : '#64748b'; // slate-300 for dark, slate-500 for light
    const gridColor = isDarkMode ? '#334155' : '#f1f5f9'; // slate-700 for dark, slate-100 for light

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={chartData}
                margin={{
                    top: 5,
                    right: 30,
                    left: -10,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="date" tick={{ fill: tickColor, fontFamily: 'Poppins' }} />
                <YAxis
                    tickFormatter={valueToMood}
                    domain={[0, 7]}
                    ticks={[1, 2, 3, 4, 5, 6]}
                    tick={{ fill: tickColor, fontFamily: 'Poppins' }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(5px)',
                        border: '1px solid',
                        borderColor: isDarkMode ? '#475569' : '#e2e8f0',
                        borderRadius: '16px',
                        fontFamily: 'Poppins',
                        color: isDarkMode ? '#f1f5f9' : '#333',
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                    formatter={(value, name, props) => [`${props.payload.mood}`, 'Mood']}
                />
                <Legend wrapperStyle={{ color: tickColor, fontFamily: 'Poppins' }} />
                <Line type="monotone" dataKey="moodValue" name="Mood Trend" stroke="#8b5cf6" strokeWidth={3} activeDot={{ r: 8 }} dot={{ stroke: '#c4b5fd', strokeWidth: 2, r: 5 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default MoodChart;