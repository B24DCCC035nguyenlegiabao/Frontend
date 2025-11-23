import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { courseService } from "../../services";
import type { CreateCourseRequest, UpdateCourseRequest } from "../../types";
import { getErrorMessage } from "../../utils/helpers";
import { toISODateTime, fromISODateTime } from "../../utils/dateUtils";

const CourseFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    courseCode: "",
    startDate: "",
    endDate: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      loadCourse(parseInt(id));
    }
  }, [id, isEdit]);

  const loadCourse = async (courseId: number) => {
    try {
      const course = await courseService.getById(courseId);
      setFormData({
        courseCode: course.courseCode,
        startDate: fromISODateTime(course.startDate),
        endDate: fromISODateTime(course.endDate),
        content: course.content,
      });
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.courseCode || !formData.startDate || !formData.endDate) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }

    try {
      setLoading(true);
      const data = {
        courseCode: formData.courseCode,
        startDate: toISODateTime(formData.startDate),
        endDate: toISODateTime(formData.endDate),
        content: formData.content,
      };

      if (isEdit && id) {
        await courseService.update(parseInt(id), data as UpdateCourseRequest);
      } else {
        await courseService.create(data as CreateCourseRequest);
      }
      navigate("/courses");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? "Chỉnh sửa khóa học" : "Thêm khóa học mới"}
          </h1>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <Input
              label="Mã khóa học"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              required
            />

            <Input
              label="Thời gian bắt đầu"
              name="startDate"
              type="datetime-local"
              value={formData.startDate}
              onChange={handleChange}
              required
            />

            <Input
              label="Thời gian kết thúc"
              name="endDate"
              type="datetime-local"
              value={formData.endDate}
              onChange={handleChange}
              required
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nội dung khóa học
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Đang lưu..." : isEdit ? "Cập nhật" : "Thêm mới"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/courses")}
              >
                Hủy
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default CourseFormPage;
