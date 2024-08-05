import Icon from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCallback, useRef, useState, useTransition } from 'react';
import Webcam from 'react-webcam';
import { uploadImageAction } from '../actions';
import { toast } from '@/components/ui/use-toast';

const videoConstraints = {
  width: 1024,
  height: 1024,
  facingMode: 'user',
};

interface IProps {
  onSuccess: (imgUrl: string) => void;
}

function TakePicture(props: IProps): JSX.Element {
  const { onSuccess } = props;
  const [imgDataUrl, setImgDataUrl] = useState<string>();

  const webcamRef = useRef<Webcam | null>(null);
  const capture = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImgDataUrl(imageSrc);
      }
    }
  }, [webcamRef]);

  const [isPending, startTransition] = useTransition();

  function uploadImage(file: File) {
    startTransition(async () => {
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = await new Uint8Array(arrayBuffer);
        const res = await uploadImageAction(buffer);
        if (res.success && res.data) {
          toast({ title: 'Success', description: res.message });
          setImgDataUrl(undefined);
          onSuccess(res.data);
        } else {
          toast({ title: 'Failed', description: res.message });
        }
      } else {
        toast({ title: 'Failed', description: 'No file found to upload' });
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="border-2 w-32 aspect-square h-full flex flex-col justify-center gap-4"
        >
          <Icon icon="camera" fontSize={36} />
          <p className="text-sm text-center">Take picture</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogTitle>Take picture</DialogTitle>
        <DialogDescription>Take a photo of your product</DialogDescription>
        {imgDataUrl ? (
          <div>
            <img src={imgDataUrl} />
            <div className="flex justify-end gap-3 mt-3">
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => setImgDataUrl(undefined)}
              >
                Capture again <Icon icon="resetImage" className="ml-2" />
              </Button>
              <Button
                type="button"
                disabled={isPending}
                onClick={async () => {
                  const imageFile = await convertDataUrlToJpegFile(imgDataUrl);
                  uploadImage(imageFile);
                }}
              >
                Confirm <Icon icon="check" className="ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mx-auto object-contain relative">
              <Webcam
                audio={false}
                height={1024}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1024}
                videoConstraints={videoConstraints}
              />
            </div>
            <Button
              type="button"
              className="absolute bottom-4 md:bottom-16 left-1/2 -translate-x-1/2"
              onClick={() => capture()}
              variant="link"
            >
              <Icon icon="cameraIris" fontSize={64} />
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TakePicture;

export async function convertDataUrlToJpegFile(src: string): Promise<File> {
  const response = await fetch(src);
  const blob = await response.blob();
  const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
  return file;
}
