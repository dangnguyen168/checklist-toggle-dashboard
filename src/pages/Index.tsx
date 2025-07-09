import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Power } from "lucide-react";

const Index = () => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [machineStates, setMachineStates] = useState<Record<string, boolean>>({
    airSuction: false,
    airCompressor: false,
    washingFilter: false,
    preNickelPlating: true, // shown as on in the image
    nickelPlating1: false,
    nickelPlating2: false,
    nickelPlating3: false,
    circulationPump: true, // shown as on in the image
  });

  const checklistItems = [
    { id: 1, text: "Kiểm tra máy hút hơi" },
    { id: 2, text: "Kiểm tra máy nén khí" },
    { id: 3, text: "Kiểm tra máy lọc Washing" },
    { id: 4, text: "Kiểm tra máy lọc Pre-nickel plating" },
    { id: 5, text: "Kiểm tra máy lọc Nickel plating 1" },
    { id: 6, text: "Kiểm tra máy lọc Nickel plating 2" },
    { id: 7, text: "Kiểm tra máy lọc Nickel plating 3" },
    { id: 8, text: "Kiểm tra máy bơm tuần hoàn Boiling degreasing" },
    { id: 9, text: "Kiểm tra nhiệt" },
    { id: 10, text: "Kiểm tra van điện" },
  ];

  const machines = [
    { id: "airSuction", name: "Máy hút hơi", color: "text-red-600" },
    { id: "airCompressor", name: "Máy nén khí", color: "text-red-600" },
    { id: "washingFilter", name: "Máy lọc washing", color: "text-red-600" },
    { id: "preNickelPlating", name: "Máy lọc Pre-nickel plating", color: "text-gray-800" },
    { id: "nickelPlating1", name: "Máy lọc Nickel plating 1", color: "text-red-600" },
    { id: "nickelPlating2", name: "Máy lọc Nickel plating 2", color: "text-red-600" },
    { id: "nickelPlating3", name: "Máy lọc Nickel plating 3", color: "text-red-600" },
    { id: "circulationPump", name: "Máy bơm tuần hoàn", color: "text-gray-800" },
  ];

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const handleMachineToggle = (machineId: string) => {
    setMachineStates(prev => ({
      ...prev,
      [machineId]: !prev[machineId]
    }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CHECK LIST</h1>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Checklist (1/3 width) */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 text-center">
                DANH SÁCH KIỂM TRA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {checklistItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium text-gray-600 w-6">
                    {item.id}
                  </span>
                  <div className="flex-1">
                    <label className="text-sm text-gray-700 cursor-pointer select-none">
                      {item.text}
                    </label>
                  </div>
                  <Checkbox
                    checked={checkedItems[item.id] || false}
                    onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                    className="h-5 w-5"
                  />
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <Button 
                  onClick={resetChecklist}
                  variant="outline"
                  className="w-full"
                >
                  Reset Danh sách
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Machine Controls (2/3 width) */}
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 text-center">
                CÔNG TẮC ĐIỀU KHIỂN
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {machines.map((machine) => (
                  <Card 
                    key={machine.id} 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                      machineStates[machine.id] 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200'
                    }`}
                    onClick={() => handleMachineToggle(machine.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <h3 className={`text-sm font-medium mb-4 ${machine.color}`}>
                        {machine.name}
                      </h3>
                      
                      <div className="flex flex-col items-center space-y-3">
                        <div 
                          className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                            machineStates[machine.id]
                              ? 'bg-green-500 border-green-400'
                              : 'bg-gray-200 border-gray-300'
                          }`}
                        >
                          <Power 
                            className={`w-6 h-6 transition-colors duration-300 ${
                              machineStates[machine.id] ? 'text-white' : 'text-gray-500'
                            }`}
                          />
                        </div>
                        
                        <span className={`text-xs font-medium ${
                          machineStates[machine.id] ? 'text-green-700' : 'text-gray-500'
                        }`}>
                          {machineStates[machine.id] ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
