import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Award, TrendingUp } from 'lucide-react';
import { LAST_FIVE_NTA_MOCK_RANKS } from '../lib/lmsLogic';

export const StudentRankComparisonChart: React.FC = () => {
  const latestMock =
    LAST_FIVE_NTA_MOCK_RANKS[LAST_FIVE_NTA_MOCK_RANKS.length - 1];
  const rankGain =
    LAST_FIVE_NTA_MOCK_RANKS[0].studentRank - latestMock.studentRank;

  return (
    <section
      aria-label="Student Rank vs Branch Average Bar Chart"
      data-testid="student-rank-comparison-chart"
      className="bg-[#13161F] border border-[#232734] rounded-lg p-6 md:p-8 space-y-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#232734] pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-brand-champagne uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>NTA CBT Rank Trajectory · Last 5 Mock Tests</span>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#F3F4F6]">
            Student Rank vs. SBO Colony Branch Average Rank
          </h2>
          <p className="text-base text-[#9CA3AF]">
            Lower rank bar indicates stronger standing (Rank #01 is the campus
            topper across 180 scholars)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <div className="bg-[#0A0B0E] border border-[#232734] rounded-md px-4 py-2.5">
            <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
              Current Standing
            </p>
            <p className="font-mono text-xl font-bold text-brand-champagne">
              Rank #{String(latestMock.studentRank).padStart(2, '0')}{' '}
              <span className="text-xs font-normal text-[#9CA3AF]">
                vs. Avg #{latestMock.branchAvgRank}
              </span>
            </p>
          </div>

          <div className="bg-[#0A0B0E] border border-[#232734] rounded-md px-4 py-2.5">
            <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
              5-Test Climb
            </p>
            <p className="font-mono text-xl font-bold text-[#F3F4F6] inline-flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
              <span>+{rankGain} Positions</span>
            </p>
          </div>
        </div>
      </div>

      {/* Recharts BarChart Container */}
      <div className="w-full h-80 bg-[#0A0B0E] border border-[#232734] rounded-md p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={LAST_FIVE_NTA_MOCK_RANKS}
            margin={{ top: 16, right: 24, left: 4, bottom: 8 }}
            barGap={10}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#232734"
              vertical={false}
            />
            <XAxis
              dataKey="examLabel"
              stroke="#9CA3AF"
              tick={{ fill: '#F3F4F6', fontSize: 12, fontFamily: 'monospace' }}
              axisLine={{ stroke: '#232734' }}
              tickLine={{ stroke: '#232734' }}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12, fontFamily: 'monospace' }}
              axisLine={{ stroke: '#232734' }}
              tickLine={{ stroke: '#232734' }}
              label={{
                value: 'Campus Rank (#)',
                angle: -90,
                position: 'insideLeft',
                fill: '#9CA3AF',
                fontSize: 12,
              }}
            />
            <Tooltip
              cursor={{ fill: '#13161F' }}
              contentStyle={{
                backgroundColor: '#13161F',
                borderColor: '#232734',
                borderRadius: '6px',
                color: '#F3F4F6',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
              labelStyle={{
                color: '#E0A96D',
                fontWeight: 700,
                marginBottom: '4px',
              }}
              formatter={(value: number, name: string) => [
                `Rank #${value}`,
                name,
              ]}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '12px',
                fontSize: '12px',
                color: '#F3F4F6',
              }}
            />
            <Bar
              dataKey="studentRank"
              name="Your Campus Rank (Kavin Rajan)"
              fill="#E0A96D"
              radius={[4, 4, 0, 0]}
              maxBarSize={44}
            />
            <Bar
              dataKey="branchAvgRank"
              name="SBO Colony Branch Average Rank"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              maxBarSize={44}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 5-Test Breakdown Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {LAST_FIVE_NTA_MOCK_RANKS.map((item) => (
          <div
            key={item.examCode}
            className="bg-[#0A0B0E] border border-[#232734] rounded-md p-3.5 space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-brand-champagne">
                {item.examCode}
              </span>
              <span className="font-mono text-[11px] text-[#9CA3AF]">
                {item.date}
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <p className="text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Your Rank
                </p>
                <p className="font-mono text-lg font-bold text-brand-champagne">
                  #{String(item.studentRank).padStart(2, '0')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">
                  Branch Avg
                </p>
                <p className="font-mono text-sm font-semibold text-[#3B82F6]">
                  #{item.branchAvgRank}
                </p>
              </div>
            </div>
            <p className="font-mono text-[11px] text-[#9CA3AF] pt-1 border-t border-[#232734]">
              Score: {item.studentScore}/{item.maxScore} ({item.percentile}%ile)
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudentRankComparisonChart;
