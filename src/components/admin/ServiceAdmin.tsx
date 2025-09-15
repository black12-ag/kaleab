import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useServices, Service } from '@/contexts/ServiceContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const colorOptions = [
  { label: 'Blue', value: 'from-blue-500 to-blue-600', border: 'border-blue-200', bg: 'bg-blue-50' },
  { label: 'Purple', value: 'from-purple-500 to-purple-600', border: 'border-purple-200', bg: 'bg-purple-50' },
  { label: 'Green', value: 'from-green-500 to-green-600', border: 'border-green-200', bg: 'bg-green-50' },
  { label: 'Red', value: 'from-red-500 to-red-600', border: 'border-red-200', bg: 'bg-red-50' },
  { label: 'Orange', value: 'from-orange-500 to-orange-600', border: 'border-orange-200', bg: 'bg-orange-50' },
  { label: 'Indigo', value: 'from-indigo-500 to-indigo-600', border: 'border-indigo-200', bg: 'bg-indigo-50' },
  { label: 'Slate', value: 'from-slate-500 to-slate-600', border: 'border-slate-200', bg: 'bg-slate-50' },
  { label: 'Blue-Purple', value: 'from-blue-700 to-purple-600', border: 'border-blue-200', bg: 'bg-blue-50' }
];

const ServiceForm: React.FC<{
  service?: Service;
  onSave: (service: Omit<Service, 'id'> | Service) => void;
  onCancel: () => void;
}> = ({ service, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    icon: service?.icon || '',
    title: service?.title || '',
    shortDescription: service?.shortDescription || '',
    description: service?.description || '',
    technologies: service?.technologies?.join(', ') || '',
    startingPrice: service?.startingPrice || '',
    timeline: service?.timeline || '',
    color: service?.color || 'from-blue-500 to-blue-600',
    borderColor: service?.borderColor || 'border-blue-200',
    bgColor: service?.bgColor || 'bg-blue-50',
    popular: service?.popular || false,
    type: service?.type || 'main',
    price: service?.price || '',
    visible: service?.visible !== undefined ? service.visible : true,
    category: service?.category || 'Development'
  });

  const handleColorChange = (colorValue: string) => {
    const colorOption = colorOptions.find(option => option.value === colorValue);
    if (colorOption) {
      setFormData(prev => ({
        ...prev,
        color: colorOption.value,
        borderColor: colorOption.border,
        bgColor: colorOption.bg
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
      ...(service && { id: service.id })
    };
    onSave(serviceData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="icon">Icon (Emoji)</Label>
          <Input
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
            placeholder="🚀"
            className="text-2xl"
            required
          />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Web Development"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="shortDescription">Short Description</Label>
        <Input
          id="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
          placeholder="Modern responsive websites..."
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Full Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Detailed description of the service..."
          className="min-h-[100px]"
          required
        />
      </div>

      <div>
        <Label htmlFor="technologies">Technologies (comma-separated)</Label>
        <Input
          id="technologies"
          value={formData.technologies}
          onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
          placeholder="React, Node.js, TypeScript"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startingPrice">Starting Price</Label>
          <Input
            id="startingPrice"
            value={formData.startingPrice}
            onChange={(e) => setFormData(prev => ({ ...prev, startingPrice: e.target.value }))}
            placeholder="$2,500"
            required
          />
        </div>
        <div>
          <Label htmlFor="timeline">Timeline</Label>
          <Input
            id="timeline"
            value={formData.timeline}
            onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
            placeholder="4-8 weeks"
            required
          />
        </div>
      </div>

      {formData.type === 'additional' && (
        <div>
          <Label htmlFor="price">Price (for additional services)</Label>
          <Input
            id="price"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            placeholder="$1,000+"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="color">Color Theme</Label>
          <Select value={formData.color} onValueChange={handleColorChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select color theme" />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded bg-gradient-to-r ${option.value}`}></div>
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="type">Service Type</Label>
          <Select 
            value={formData.type} 
            onValueChange={(value: 'main' | 'additional') => 
              setFormData(prev => ({ ...prev, type: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">Main Service</SelectItem>
              <SelectItem value="additional">Additional Service</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value: string) => 
              setFormData(prev => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Development">Development</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="AI & Automation">AI & Automation</SelectItem>
              <SelectItem value="Infrastructure">Infrastructure</SelectItem>
              <SelectItem value="Database">Database</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
              <SelectItem value="Training">Training</SelectItem>
              <SelectItem value="Support">Support</SelectItem>
              <SelectItem value="E-commerce">E-commerce</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="popular"
            checked={formData.popular}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, popular: checked as boolean }))
            }
          />
          <Label htmlFor="popular">Mark as Popular</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="visible"
            checked={formData.visible}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, visible: checked as boolean }))
            }
          />
          <Label htmlFor="visible">Visible to Users</Label>
          {!formData.visible && (
            <span className="text-sm text-red-500">(Hidden)</span>
          )}
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Save Service
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </form>
  );
};

const ServiceAdmin: React.FC = () => {
  const { 
    services, 
    addService, 
    updateService, 
    deleteService,
    toggleServiceVisibility,
    getMainServices,
    getAdditionalServices,
    resetToDefaults
  } = useServices();
  
  const { toast } = useToast();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<'main' | 'additional'>('main');

  // Debug logging
  console.log('ServiceAdmin - Total services:', services.length);
  console.log('ServiceAdmin - Services data:', services);

  const handleSaveService = (serviceData: Omit<Service, 'id'> | Service) => {
    try {
      if ('id' in serviceData) {
        // Update existing service
        updateService(serviceData.id, serviceData);
        toast({
          title: "Service Updated",
          description: "Service has been successfully updated.",
        });
        setEditingService(null);
      } else {
        // Add new service
        addService(serviceData);
        toast({
          title: "Service Added",
          description: "New service has been successfully added.",
        });
        setShowAddDialog(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save service. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteService = (serviceId: string, serviceName: string) => {
    if (window.confirm(`Are you sure you want to delete "${serviceName}"?`)) {
      deleteService(serviceId);
      toast({
        title: "Service Deleted",
        description: "Service has been successfully deleted.",
      });
    }
  };

  const mainServices = getMainServices(true); // Include hidden services in admin
  const additionalServices = getAdditionalServices(true); // Include hidden services in admin
  const displayedServices = activeTab === 'main' ? mainServices : additionalServices;
  const visibleServicesCount = services.filter(s => s.visible).length;
  const hiddenServicesCount = services.filter(s => !s.visible).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Service Management</h2>
          <p className="text-gray-600 dark:text-gray-300">Manage your portfolio services, pricing, and details.</p>
          <div className="flex gap-4 mt-2">
            <Badge variant="outline" className="text-green-600 border-green-200">
              <Eye className="w-3 h-3 mr-1" />
              {visibleServicesCount} Visible
            </Badge>
            <Badge variant="outline" className="text-gray-600 border-gray-200">
              <EyeOff className="w-3 h-3 mr-1" />
              {hiddenServicesCount} Hidden
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="destructive"
            onClick={() => {
              if (confirm('Reset all services to defaults? This will remove any custom services you\'ve added.')) {
                resetToDefaults();
                toast({
                  title: "Services Reset",
                  description: "All services have been reset to defaults.",
                });
              }
            }}
          >
            Reset to Defaults
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Service
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <ServiceForm
              onSave={handleSaveService}
              onCancel={() => setShowAddDialog(false)}
            />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Service Type Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <Button
          variant={activeTab === 'main' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('main')}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          Main Services ({mainServices.length})
        </Button>
        <Button
          variant={activeTab === 'additional' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('additional')}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          Additional Services ({additionalServices.length})
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedServices.map((service) => (
          <Card 
            key={service.id} 
            className={`${
              service.popular ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
            } ${
              !service.visible ? 'opacity-60 border-dashed bg-gray-50 dark:bg-gray-900' : ''
            } hover:shadow-lg transition-all`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} text-white flex items-center justify-center text-xl`}>
                    {service.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {service.title}
                      {!service.visible && (
                        <Badge variant="outline" className="text-xs text-gray-500">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Hidden
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex gap-2 mt-1">
                      {service.popular && (
                        <Badge variant="secondary">Popular</Badge>
                      )}
                      {service.category && (
                        <Badge variant="outline" className="text-xs">{service.category}</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleServiceVisibility(service.id)}
                    className={service.visible ? 'text-green-600' : 'text-gray-400'}
                    title={service.visible ? 'Hide service' : 'Show service'}
                  >
                    {service.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingService(service)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteService(service.id, service.title)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {service.shortDescription}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {service.technologies.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {service.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{service.technologies.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-green-600">{service.startingPrice}</span>
                <span className="text-gray-500">{service.timeline}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {displayedServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No {activeTab} services found.
          </p>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First {activeTab === 'main' ? 'Main' : 'Additional'} Service
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {editingService && (
            <ServiceForm
              service={editingService}
              onSave={handleSaveService}
              onCancel={() => setEditingService(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceAdmin;