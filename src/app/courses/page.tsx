import { Id } from '../../../convex/_generated/dataModel';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SignedIn, SignInButton } from '@clerk/nextjs';
import { SignedOut } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

interface Course {
  _id: Id<'courses'>;
  _creationTime: number;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

async function fetchCourses() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/query?queryName=courses:getCourses`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: 'courses:getCourses',
        args: {},
      }),
    }
  );

  const data = await response.json();
  if (data.status === 'success') {
    return data.value;
  }
  throw new Error('Failed to fetch courses');
}

const CoursesPage = async () => {
  const courses = await fetchCourses();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: Course) => (
          <Card key={course._id} className="flex flex-col">
            <Link href={`/courses/${course._id}`} className="cursor-pointer">
              <CardHeader>
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  width={640}
                  height={360}
                  className="rounded-md object-cover"
                />
              </CardHeader>
              <CardContent className="flex-grow">
                <CardTitle className="text-xl mb-2 hover:underline">
                  {course.title}
                </CardTitle>
                <p className="text-muted-foreground">{course.description}</p>
                <p className="mt-4 font-semibold">${course.price}</p>
              </CardContent>
            </Link>

            <CardFooter className="flex justify-between items-center">
              <Badge variant="default" className="text-lg px-3 py-1">
                ${course.price.toFixed(2)}
              </Badge>
              <SignedIn>Purchase</SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline">Enroll Now</Button>
                </SignInButton>
              </SignedOut>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
