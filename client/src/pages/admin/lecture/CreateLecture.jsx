import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CreateLecture = () => {

    const [lectureTitle, setLectureTitle] = useState("");

    const params = useParams();
    const courseId = params.courseId;

    const isLoading = false;
    const navigate = useNavigate();

    const createLectureHandler = async () => {
        
    }

    return (
        <div className='flex-1 mx-10'>
            <div className='mb-4'>
                <h1 className='font-bold text-xl'>Let's Add Lectures, add some basic course details for your new lecture</h1>
                <p className='text-gray-500'>You can add more details later</p>
            </div>
            <div className='space-y-4'>
                <div>
                    <Label>Title</Label>
                    <Input type="text" placeholder='Your lecture title Name' className='w-full' value={lectureTitle} onChange={(e) => setLectureTitle(e.target.value)} />
                </div>
                <div className='flex items-center gap-3'>
                    <Button variant='outline' onClick={() => navigate(`/admin/course/${courseId}`)}>Back to course</Button>
                    <Button disabled={isLoading} onClick={createLectureHandler}>
                        {isLoading ? (
                            <>
                                <Loader2 className='animate-spin h-4 w-4' />
                                Please Wait
                            </>
                        ) : "Create Lecture"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateLecture