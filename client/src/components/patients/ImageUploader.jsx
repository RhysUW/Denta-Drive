import { useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Upload, Trash2, Image, Loader } from 'lucide-react';
import { listImages, uploadImage, deleteImage } from '../../services/patientService';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

export default function ImageUploader({ patientId }) {
  const fileRef = useRef();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data: images = [], isLoading } = useQuery({
    queryKey: ['patient-images', patientId],
    queryFn: () => listImages(patientId),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ imageId }) => deleteImage(patientId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient-images', patientId] });
      toast.success('Image deleted');
    },
    onError: () => toast.error('Failed to delete image'),
  });

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10MB');
      return;
    }

    setUploading(true);
    try {
      await uploadImage(patientId, file);
      queryClient.invalidateQueries({ queryKey: ['patient-images', patientId] });
      toast.success('Image uploaded');
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Images</h3>
        <Button
          variant="secondary"
          size="sm"
          loading={uploading}
          icon={<Upload size={14} />}
          onClick={() => fileRef.current?.click()}
        >
          Upload
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader size={20} className="animate-spin text-gray-400" />
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
          <Image size={28} className="mb-2" />
          <p className="text-sm">No images yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {images.map((img) => (
            <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
              <img
                src={img.url}
                alt={img.filename}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <button
                  onClick={() => deleteMutation.mutate({ imageId: img.id })}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full p-1.5"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
