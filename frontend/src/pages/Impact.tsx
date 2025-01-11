// pages/Impact.tsx
import { Droplets, Trees, Wind } from 'lucide-react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const impactData = [
  { month: 'Jan', trees: 12, carbon: 2.4, contributions: 150 },
  { month: 'Feb', trees: 19, carbon: 3.8, contributions: 220 },
  { month: 'Mar', trees: 25, carbon: 5.0, contributions: 280 },
  { month: 'Apr', trees: 32, carbon: 6.4, contributions: 340 },
  { month: 'May', trees: 40, carbon: 8.0, contributions: 420 },
  { month: 'Jun', trees: 48, carbon: 9.6, contributions: 500 },
];

export const Impact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Environmental Impact</h1>

      {/* Impact Statistics */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Trees className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-gray-600">Trees Planted</h3>
              <div className="text-2xl font-bold">48</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Through our partnership with reforestation projects
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Wind className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-gray-600">Carbon Offset</h3>
              <div className="text-2xl font-bold">9.6 tons</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Equivalent to taking 2 cars off the road for a year
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Droplets className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-gray-600">Total Contributions</h3>
              <div className="text-2xl font-bold">$500</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Supporting various environmental initiatives
          </div>
        </div>
      </div>

      {/* Impact Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-12">
        <h2 className="text-xl font-bold mb-6">Impact Growth</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={impactData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="trees" 
                stroke="#059669" 
                name="Trees Planted"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="carbon" 
                stroke="#0284c7" 
                name="Carbon Offset (tons)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Project Updates */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-6">Supported Projects</h2>
        <div className="space-y-6">
          {[
            {
              title: "Amazon Rainforest Conservation",
              description: "Supporting local communities in protecting rainforest areas",
              progress: 75
            },
            {
              title: "Urban Reforestation Initiative",
              description: "Planting trees in cities to improve air quality",
              progress: 60
            },
            {
              title: "Clean Ocean Project",
              description: "Removing plastic waste from oceans and coastal areas",
              progress: 45
            }
          ].map((project, index) => (
            <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">{project.title}</h3>
                <span className="text-green-600">{project.progress}%</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{project.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 rounded-full h-2" 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};