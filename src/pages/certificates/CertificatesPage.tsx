import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { enrollmentService } from "../../services";
import { CertificateStatus } from "../../types";
import type { IssueCertificateRequest } from "../../types";
import { getErrorMessage } from "../../utils/helpers";

const CertificatesPage: React.FC = () => {
  const [enrollmentId, setEnrollmentId] = useState("");
  const [status, setStatus] = useState<CertificateStatus>(
    CertificateStatus.PASS
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!enrollmentId) {
      setError("Vui lòng nhập ID đăng ký học");
      return;
    }

    try {
      setLoading(true);
      const data: IssueCertificateRequest = { status };
      await enrollmentService.issueCertificate(parseInt(enrollmentId), data);
      setSuccess("Cấp chứng chỉ thành công!");
      setEnrollmentId("");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Cấp chứng chỉ</h1>
          <p className="text-gray-600 mt-2">
            Cập nhật trạng thái chứng chỉ cho học viên
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Đăng ký học <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={enrollmentId}
                onChange={(e) => setEnrollmentId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Nhập ID đăng ký học"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Bạn có thể tìm ID đăng ký học trong lịch sử học của học viên
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value={CertificateStatus.PASS}
                    checked={status === CertificateStatus.PASS}
                    onChange={(e) =>
                      setStatus(e.target.value as CertificateStatus)
                    }
                    className="mr-2"
                  />
                  <span className="text-green-700 font-medium">Đạt</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value={CertificateStatus.FAIL}
                    checked={status === CertificateStatus.FAIL}
                    onChange={(e) =>
                      setStatus(e.target.value as CertificateStatus)
                    }
                    className="mr-2"
                  />
                  <span className="text-red-700 font-medium">Không đạt</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value={CertificateStatus.PENDING}
                    checked={status === CertificateStatus.PENDING}
                    onChange={(e) =>
                      setStatus(e.target.value as CertificateStatus)
                    }
                    className="mr-2"
                  />
                  <span className="text-yellow-700 font-medium">Chờ xử lý</span>
                </label>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                {success}
              </div>
            )}

            <Button type="submit" disabled={loading} variant="success">
              {loading ? "Đang cập nhật..." : "Cấp chứng chỉ"}
            </Button>
          </form>
        </Card>

        <Card title="Hướng dẫn" className="mt-6">
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Truy cập trang "Học viên" để xem danh sách học viên</li>
            <li>
              Nhấn vào "Lịch sử" của học viên để xem các khóa học đã đăng ký
            </li>
            <li>
              Sao chép ID đăng ký học (enrollment ID) từ danh sách lịch sử
            </li>
            <li>Nhập ID vào form trên và chọn trạng thái phù hợp</li>
            <li>Nhấn "Cấp chứng chỉ" để cập nhật</li>
          </ul>
        </Card>
      </div>
    </Layout>
  );
};

export default CertificatesPage;
